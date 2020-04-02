import { RequestHandler } from 'fastify';

import { categoriesVersions, versionsPackages, categoriesList } from 'lib/db/methods';

import { formatDate, getLastVersion } from 'utils';

import { categoryAddBodySchema } from 'validation-schemas';

import { Category } from 'types/data';

export const putCategory: RequestHandler<unknown, unknown, unknown, { categoryId: string }, unknown, Category> = async (
  req,
  reply
) => {
  if (!req.params.categoryId) return reply.code(400).send('Path parameter categoryId is missing');

  const { params, body } = req;
  const { categoryId } = params;

  try {
    const previousVersions = await categoriesVersions.getAllWithId(categoryId);

    if (previousVersions.length < 1) {
      return reply.code(400).send(`Category with id ${categoryId} not found and can't update`);
    }

    const nextVersion = `v${getLastVersion(previousVersions) + 1}`;
    const publishedDate = formatDate(new Date());

    await categoryAddBodySchema.validate(body);

    if (categoryId !== body.id) {
      return reply.code(400).send('Path parameter categoryId is not equal to body.id');
    }

    const response = await categoriesVersions.add(body, nextVersion, publishedDate);

    await versionsPackages.updateOne(categoryId, nextVersion);

    await categoriesList.updateOne(categoryId, nextVersion);

    return response;
  } catch (e) {
    return reply.code(400).send(e);
  }
};
