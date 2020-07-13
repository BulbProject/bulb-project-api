import { ConfigModule } from '@nestjs/config';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';

import { CategoriesModule } from '../../../src/categories';
import { DatabaseModule } from '../../../src/shared/database';
import { databaseConfig, serviceConfig } from '../../../src/core/config';

import { Context } from '../entity';
import { withDatabase } from './with-database';
import { withDone } from './with-done';

export function withApp(context: Context): void {
  withDatabase(context);

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        CategoriesModule,
        DatabaseModule,
        context.databaseModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [serviceConfig, databaseConfig],
        }),
      ],
    }).compile();

    context.app = moduleFixture.createNestApplication(
      new FastifyAdapter({
        ignoreTrailingSlash: true,
        caseSensitive: false,
      })
    );

    await context.app.init();
    await context.app.getHttpAdapter().getInstance().ready();

    context.request = supertest(context.app.getHttpServer());
  });

  withDone(context, async ({ app }) => {
    await app.close();
  });
}
