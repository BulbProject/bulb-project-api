import { registerAs } from '@nestjs/config';

import packageJson from '../../../package.json';

interface ServiceConfig {
  url: string;
  port: number;
  name: string;
  version: string;
}

export const serviceConfig = registerAs(
  'service',
  (): ServiceConfig => ({
    url: process.env.SERVICE_URL || `http://localhost:${process.env.SERVICE_PORT}`,
    port: Number(process.env.SERVICE_PORT),
    name: 'The Bulb Project',
    version: packageJson.version,
  })
);
