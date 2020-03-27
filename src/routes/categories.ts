import fastify from 'fastify';

import { categoriesListEntity, versionsPackage, categoryVersion } from 'controllers';

export const categoriesRoute = (app: fastify.FastifyInstance): void => {
  app.get('/categories', async () => {
    return await categoriesListEntity.getAll();
  });

  app.get('/categories/:categoryId', async ({ params }) => {
    return await versionsPackage.getOne(params.categoryId);
  });

  app.get('/categories/:categoryId/:version', async ({ params }) => {
    return await categoryVersion.getOne(params.categoryId, params.version);
  });
};
