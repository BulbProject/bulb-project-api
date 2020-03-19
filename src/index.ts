import * as express from 'express';

import { serviceConfig } from 'config';

import logger from 'lib/logger';

const app = express();

app.listen(serviceConfig.port, () => {
  logger.info(`Service run on ${serviceConfig.port}`);
});
