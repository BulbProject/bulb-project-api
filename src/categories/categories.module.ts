import { Module } from '@nestjs/common';

import { CategoriesListRepositoryModule } from '../shared/modules/categories-list-repository';
import { CategoryVersionRepositoryModule } from '../shared/modules/category-version-repository';
import { VersionsPackageRepositoryModule } from '../shared/modules/versions-package-repository';

import { CategoriesController } from './categories.controller';
import { CategoriesDetailsService } from './services';

@Module({
  imports: [CategoriesListRepositoryModule, CategoryVersionRepositoryModule, VersionsPackageRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesDetailsService],
})
export class CategoriesModule {}
