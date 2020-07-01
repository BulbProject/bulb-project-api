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
    url: `https://udoc.eprocurement.systems`,
    repo: {
      owner: 'BulbProject',
      name: 'bulb-project-api',
      branch: 'develop',
    },
  })
);
