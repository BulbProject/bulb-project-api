import './lib/env';

import packageJson from '../package.json';

export const serviceConfig = {
  host: process.env.SERVICE_HOST || '',
  port: process.env.SERVICE_PORT || '3333',
  url: `${process.env.SERVICE_HOST}${process.env.SERVICE_PORT ? `:${process.env.SERVICE_PORT}` : ''}`,

  name: 'The Bulb Project',
  version: packageJson.version,
};

export const dbConfig = {
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '27017',
  name: process.env.DB_NAME || 'bulb-api',
};
