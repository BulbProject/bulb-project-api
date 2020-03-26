import mongoose from 'mongoose';

import { dbConfig } from 'config';

export const connectToDb = async (): Promise<void> => {
  mongoose.set('useCreateIndex', true);

  await mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('DB was connected');
};
