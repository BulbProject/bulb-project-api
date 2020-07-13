import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getMongoRepository } from 'typeorm';

import { CategoriesListEntry } from '../../../src/shared/repositories/categories-list/models';
import { CategoryVersion } from '../../../src/shared/repositories/category-version/models';
import { Specification } from '../../../src/shared/repositories/specification/models';
import { VersionsPackage } from '../../../src/shared/repositories/versions-package/models';

import { Context } from '../entity';
import { withDone } from './with-done';

export function withDatabase(context: Context): void {
  const entities = [CategoriesListEntry, VersionsPackage, CategoryVersion, Specification];

  beforeAll(async () => {
    const databaseName = 'bulb-db-TEST';

    context.databaseServer = new MongoMemoryServer({
      instance: {
        storageEngine: 'wiredTiger',
        dbName: databaseName,
      },
    });

    await context.databaseServer.start();

    // @ts-ignore
    const { ip: host, port } = context.databaseServer.getInstanceInfo();

    context.databaseModule = TypeOrmModule.forRoot({
      type: 'mongodb',
      host,
      port,
      database: databaseName,
      entities,
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  });

  withDone(context, async ({ databaseServer }) => {
    await databaseServer.stop();
  });

  afterEach(async () => {
    await Promise.all(entities.map((entity) => getMongoRepository(entity).deleteMany({})));
  });
}
