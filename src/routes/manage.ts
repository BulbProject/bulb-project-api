import fastify from 'fastify';

import { categoryVersion } from 'controllers';

/* @TODO Must be secure */
export const manage = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.post('/categories/:categoryId', async ({ body }) => {
        return await categoryVersion.save(body);
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
