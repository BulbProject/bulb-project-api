import fastify from 'fastify';

import { categoriesListEntity, versionsPackage, categoryVersion } from 'controllers';

import { categoryAddBodySchema } from 'validation-schemas';

import { formatDate, getLastVersion } from 'utils';

import { Category } from 'types/data';

/* @TODO Must be secure */
export const manageRoute = (app: fastify.FastifyInstance): void => {
  app.post<{}, { categoryId: string }, {}, Category>('/manage/categories/:categoryId', {}, async (req, reply) => {
    if (!req.params.categoryId) return reply.code(400).send('Path parameter categoryId is missing');

    const { body, params } = req;

    const version = 'v1';
    const publishedDate = formatDate(new Date());

    try {
      await categoryAddBodySchema.validate(body);

      if (params.categoryId !== body.id) {
        return reply.code(400).send('Path parameter categoryId is not equal to body.id');
      }

      const response = await categoryVersion.add(body, version, publishedDate);

      await versionsPackage.add(params.categoryId, version, publishedDate);

      await categoriesListEntity.add(params.categoryId, version);

      return response;
    } catch (e) {
      return reply.code(400).send(e);
    }
  });

  app.put<{}, { categoryId: string }, {}, Category>('/manage/categories/:categoryId', async (req, reply) => {
    if (!req.params.categoryId) return reply.code(400).send('Path parameter categoryId is missing');

    const { params, body } = req;
    const { categoryId } = params;

    try {
      const previousVersions = await categoryVersion.getAllWithId(categoryId);

      if (previousVersions.length < 1) {
        return reply.code(400).send(`Category with id ${categoryId} not found and can't update`);
      }

      const nextVersion = `v${getLastVersion(previousVersions) + 1}`;
      const publishedDate = formatDate(new Date());

      await categoryAddBodySchema.validate(body);

      if (categoryId !== body.id) {
        return reply.code(400).send('Path parameter categoryId is not equal to body.id');
      }

      const response = await categoryVersion.add(body, nextVersion, publishedDate);

      await versionsPackage.updateOne(categoryId, nextVersion);

      await categoriesListEntity.updateOne(categoryId, nextVersion);

      return response;
    } catch (e) {
      return reply.code(400).send(e);
    }
  });
};
