import fastify from 'fastify';

import { categoryVersion, versionsPackage } from 'controllers';

export const categories = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.get('/', async () => {
        return 'Categories list';
      });

      instance.get('/:categoryId', async ({ params }) => {
        return versionsPackage.getOne(params.categoryId);
      });

      instance.get('/:categoryId/:version', async ({ params }) => {
        return await categoryVersion.getOne(params.categoryId, params.version);
      });

      next();
    },
    { prefix: 'categories' }
  );
};
