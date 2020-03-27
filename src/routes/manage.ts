import fastify from 'fastify';

import { categoriesListEntity, versionsPackage, categoryVersion } from 'controllers';

/* @TODO Must be secure */
export const manageRoute = (app: fastify.FastifyInstance): void => {
  app.post('/manage/categories/:categoryId', async ({ body }) => {
    await categoriesListEntity.save(body.id, '1');

    await versionsPackage.save(body.id);

    return await categoryVersion.save(body);
  });

  app.patch('/manage/categories/:categoryId', async req => {
    return `Update category with id ${req.params.categoryId}`;
  });
};
