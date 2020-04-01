import mongoose from 'mongoose';

import { dbConfig } from 'config';

export const connectToDb = async (): Promise<void> => {
  mongoose.set('useCreateIndex', true);

  const url = `mongodb://${dbConfig.host}:${dbConfig.port}`;

  console.log('Connecting to DB ...');

  await mongoose.connect(url, {
    user: dbConfig.username,
    pass: dbConfig.password,
    dbName: dbConfig.name,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('DB was connected');
};
