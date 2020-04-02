import './lib/env';

import packageJson from '../package.json';

export const serviceConfig = {
  protocol: process.env.SERVICE_PROTOCOL || 'http',
  host: process.env.SERVICE_HOST || 'localhost',
  port: process.env.SERVICE_PORT || '3333',
  url: `${process.env.SERVICE_PROTOCOL}://${process.env.SERVICE_HOST}${
    process.env.SERVICE_PORT ? `:${process.env.SERVICE_PORT}` : ''
  }`,

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
