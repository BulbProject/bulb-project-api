import fastify from 'fastify';

import { categoriesListEntity, versionsPackage, categoryVersion } from 'controllers';

import { formatDate } from 'utils';

/* @TODO Must be secure */
export const manageRoute = (app: fastify.FastifyInstance): void => {
  app.post('/manage/categories/:categoryId', async ({ body }, reply) => {
    try {
      const version = 'v1';
      const publishedDate = formatDate(new Date());

      await categoriesListEntity.save(body.id, version);

      await versionsPackage.save(body.id, version, publishedDate);

      return await categoryVersion.add(body, version, publishedDate);
    } catch (e) {
      return reply.code(400).send(e);
    }
  });

  app.patch('/manage/categories/:categoryId', async req => {
    return `Update category with id ${req.params.categoryId}`;
  });
};
