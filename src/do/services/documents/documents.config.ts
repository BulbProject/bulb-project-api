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
    url: process.env.DOCUMENTS_URL || 'https://udoc.eprocurement.systems',
    repo: {
      owner: process.env.DOCUMENTS_REPO_OWNER || 'BulbProject',
      name: process.env.DOCUMENTS_REPO_NAME || 'bulb-project-api',
      branch: process.env.DOCUMENTS_REPO_BRANCH || 'master',
    },
  })
);
