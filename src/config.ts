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

export const documentService = {
  url: `https://udoc.eprocurement.systems`,
  repo: {
    owner: 'BulbProject',
    name: 'bulb-project-api',
    branch: 'develop',
  },
};

export const specificationCleanerConfig = {
  runInterval: +(process.env.SC_RUN_INTERVAL_DAYS ?? 1),
  deleteThreshold: +(process.env.SC_DELETE_THRESHOLD_DAYS ?? 7),
};
