import fastify from 'fastify';

import { category } from 'controllers';

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
        try {
          return await category.getOne(params.categoryId, params.version);
        } catch (e) {
          console.error(e);
        }
      });

      next();
    },
    { prefix: 'categories' }
  );
};
