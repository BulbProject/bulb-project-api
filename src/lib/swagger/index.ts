import fastify from 'fastify';

import fastifySwagger from 'fastify-swagger';

const register = (app: fastify.FastifyInstance): void => {
  app.register(fastifySwagger, {
    routePrefix: '/$wagger',
    exposeRoute: true,
  });
};

export default { register };
