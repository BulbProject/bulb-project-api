import { registerAs } from '@nestjs/config';

interface ManageConfig {
  username: string;
  password: string;
}

export const manageConfig = registerAs(
  'manage',
  (): ManageConfig => ({
    username: process.env.MANAGE_USERNAME || '',
    password: process.env.MANAGE_PASSWORD || '',
  })
);
