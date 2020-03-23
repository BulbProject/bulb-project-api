import fastify from 'fastify';

export const categories = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.get('/', async () => {
        return 'Categories list';
      });

      instance.get('/:categoryId', async req => {
        return `Category with id ${req.params.categoryId}`;
      });

      instance.get('/:categoryId/:versionId', async req => {
        return `Category with id ${req.params.categoryId} and version ${req.params.versionId}`;
      });

      next();
    },
    { prefix: 'categories' }
  );
};
