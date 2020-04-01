import fastify from 'fastify';

import { connectToDb } from 'lib/db';
import swagger from 'lib/swagger';

import routes from 'routes';

import { serviceConfig } from 'config';

const app = fastify({ logger: true, ignoreTrailingSlash: true });

swagger.register(app);

routes.forEach(route => route(app));

const start = async (): Promise<void> => {
  try {
    await app.listen(+serviceConfig.port);
    if (process.env.NODE_ENV === 'development') console.log(app.printRoutes());

    await connectToDb();
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
