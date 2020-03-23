import fastify from 'fastify';

/* @TODO Must be secure */
export const manage = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.post('/categories/:categoryId', async req => {
        return `Created category with id ${req.params.categoryId}`;
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
