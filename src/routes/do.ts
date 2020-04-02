import fastify from 'fastify';

export const doRoute = (app: fastify.FastifyInstance): void => {
  app.post('/do/calculation/:categoryId/:version', { schema: { hide: true } }, async req => {
    return `Calculation under specific category with id ${req.params.categoryId} and version ${req.params.version}`;
  });

  app.post('/do/evaluation/:categoryId/:version', { schema: { hide: true } }, async req => {
    return `Evaluation under specific category id ${req.params.categoryId} and version ${req.params.version}`;
  });
};
