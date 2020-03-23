import fastify from 'fastify';

export const action = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.post('/calculation/:categoryId/:versionId', async req => {
        return `Calculation under specific category with id ${req.params.categoryId} and version ${req.params.versionId}`;
      });

      instance.post('/evaluation/:categoryId/:versionId', async req => {
        return `Evaluation under specific category id ${req.params.categoryId} and version ${req.params.versionId}`;
      });

      next();
    },
    {
      prefix: 'action',
    }
  );
};
