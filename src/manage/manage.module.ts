import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CategoriesListRepositoryModule } from '../shared/modules/categories-list-repository';
import { CategoryVersionRepositoryModule } from '../shared/modules/category-version-repository';
import { VersionsPackageRepositoryModule } from '../shared/modules/versions-package-repository';

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
