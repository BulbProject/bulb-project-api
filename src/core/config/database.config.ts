import { registerAs } from '@nestjs/config';

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export const databaseConfig = registerAs(
  'database',
  (): DatabaseConfig => ({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 27017),
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || '123456',
    name: process.env.DB_NAME || 'bulb-db',
  })
);
