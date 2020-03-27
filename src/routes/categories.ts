import fastify from 'fastify';

import { categoryVersion } from 'controllers';

export const categories = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.get('/', async () => {
        return 'Categories list';
      });

      instance.get('/:categoryId', async req => {
        return `Category with id ${req.params.categoryId}`;
      });

      instance.get('/:categoryId/:version', async ({ params }) => {
        return await categoryVersion.getOne(params.categoryId, params.version);
      });

      next();
    },
    { prefix: 'categories' }
  );
};
