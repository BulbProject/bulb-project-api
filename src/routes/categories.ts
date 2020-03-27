import fastify from 'fastify';

import { categoriesListEntity, versionsPackage, categoryVersion } from 'controllers';

export const categories = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.get('/', async () => {
        return await categoriesListEntity.getAll();
      });

      instance.get('/:categoryId', async ({ params }) => {
        return await versionsPackage.getOne(params.categoryId);
      });

      instance.get('/:categoryId/:version', async ({ params }) => {
        return await categoryVersion.getOne(params.categoryId, params.version);
      });

      next();
    },
    { prefix: 'categories' }
  );
};
