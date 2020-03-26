import fastify from 'fastify';

import { category } from 'controllers';

/* @TODO Must be secure */
export const manage = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.post('/categories/:categoryId', async ({ body }) => {
        try {
          return await category.save(body);
        } catch (e) {
          return e;
        }
      });

      instance.patch('/categories/:categoryId', async req => {
        return `Update category with id ${req.params.categoryId}`;
      });

      next();
    },
    {
      prefix: 'manage',
    }
  );
};
