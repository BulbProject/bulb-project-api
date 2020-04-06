import mongoose from 'mongoose';

import logger from 'lib/logger';

import { dbConfig } from 'config';

export const connectToDb = async (): Promise<void> => {
  mongoose.set('useCreateIndex', true);

  const url = `mongodb://${dbConfig.host}:${dbConfig.port}`;

  logger.info('Connecting to DB ...');

  await mongoose.connect(url, {
    user: dbConfig.username,
    pass: dbConfig.password,
    dbName: dbConfig.name,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  logger.info('DB was connected');
};
