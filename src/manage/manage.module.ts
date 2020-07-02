import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CategoriesListRepositoryModule } from '../shared/repositories/categories-list';
import { CategoryVersionRepositoryModule } from '../shared/repositories/category-version';
import { VersionsPackageRepositoryModule } from '../shared/repositories/versions-package';

import { ManageController } from './manage.controller';
import { IdValidatorPipe } from './pipes';
import { manageConfig } from './manage.config';

@Module({
  imports: [
    ConfigModule.forFeature(manageConfig),
    CategoryVersionRepositoryModule,
    VersionsPackageRepositoryModule,
    CategoriesListRepositoryModule,
  ],
  controllers: [ManageController],
  providers: [IdValidatorPipe, ValidationPipe],
})
export class ManageModule {}
