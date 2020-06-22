import fastify from 'fastify';

import cors from 'fastify-cors';

import { connectToDb } from 'lib/db';
import swagger from 'lib/swagger';
import { loggerOptions } from 'lib/logger';
import { SpecificationCleaner } from 'services';

import routes from 'routes';

import { serviceConfig } from 'config';

const app = fastify({ logger: loggerOptions, ignoreTrailingSlash: true });

swagger.register(app);

app.register(cors, { exposedHeaders: 'Content-Disposition' });

routes.forEach((route) => route(app));

const start = async (): Promise<void> => {
  try {
    await app.listen({ host: '0.0.0.0', port: +(serviceConfig.port as string) });
    if (process.env.NODE_ENV === 'development') app.log.info(app.printRoutes());

    await connectToDb();
    await SpecificationCleaner.start();
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
