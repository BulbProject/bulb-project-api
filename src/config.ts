import './lib/env';

import packageJson from '../package.json';

export const serviceConfig = {
  url: process.env.SERVICE_URL || `http://localhost:${process.env.SERVICE_PORT}`,
  port: process.env.SERVICE_PORT,

  name: 'The Bulb Project',
  version: packageJson.version,
};

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '27017',
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || '123456',
  name: process.env.DB_NAME || 'bulb-api',
};

export const manageCred = {
  username: process.env.MANAGE_USERNAME || '',
  password: process.env.MANAGE_PASSWORD || '',
};
