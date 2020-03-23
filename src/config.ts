import './lib/env';

export const serviceConfig = {
  port: +(process.env.SERVICE_PORT || 3333),
};

export const dbConfig = {
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '27017',
  name: process.env.DB_NAME || 'bulb-api',
};
