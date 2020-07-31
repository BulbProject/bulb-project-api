import { registerAs } from '@nestjs/config';

interface DocumentsConfig {
  url: string;
  repo: {
    owner: string;
    name: string;
    branch: string;
  };
}

export const documentsConfig = registerAs(
  'documents',
  (): DocumentsConfig => ({
    url: process.env.DOCS_SERVICE_URL || 'https://udoc.eprocurement.systems',
    repo: {
      owner: process.env.DOCS_SERVICE_REPO_OWNER || 'BulbProject',
      name: process.env.DOCS_SERVICE_REPO_NAME || 'bulb-project-api',
      branch: process.env.DOCS_SERVICE_REPO_BRANCH || 'master',
    },
  })
);
