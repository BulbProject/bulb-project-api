import { DynamicModule, INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import supertest from 'supertest';

export interface Context {
  app: INestApplication;
  request: ReturnType<typeof supertest>;
  databaseModule: DynamicModule;
  databaseServer: MongoMemoryServer;
}
