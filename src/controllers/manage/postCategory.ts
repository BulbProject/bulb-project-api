import { RequestHandler } from 'fastify';

import { categoriesVersions, versionsPackages, categoriesList } from 'lib/db/methods';

import { formatDate } from 'utils';

import { categoryAddBodySchema } from 'validation-schemas';

import { Category } from 'types/data';

export const postCategory: RequestHandler<
  unknown,
  unknown,
  unknown,
  { categoryId: string },
  unknown,
  Category
> = async (req, reply) => {
  if (!req.params.categoryId) return reply.code(400).send('Path parameter categoryId is missing');

  const { body, params } = req;

  const version = 'v1';
  const publishedDate = formatDate(new Date());

  try {
    await categoryAddBodySchema.validate(body);

    if (params.categoryId !== body.id) {
      return reply.code(400).send('Path parameter categoryId is not equal to body.id');
    }

    const response = await categoriesVersions.add(body, version, publishedDate);

    await versionsPackages.add(params.categoryId, version, publishedDate);

    await categoriesList.add(params.categoryId, version);

    return response;
  } catch (e) {
    return reply.code(400).send(e);
  }
};
