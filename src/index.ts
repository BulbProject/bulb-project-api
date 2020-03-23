import fastify from 'fastify';

import routes from 'routes';

import { serviceConfig } from 'config';

const app = fastify({ logger: true, ignoreTrailingSlash: true });

routes.forEach(route => route(app));

const start = async (): Promise<void> => {
  try {
    await app.listen(serviceConfig.port);
    // eslint-disable-next-line no-console
    if (process.env.NODE_ENV !== 'production') console.log(app.printRoutes());
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
