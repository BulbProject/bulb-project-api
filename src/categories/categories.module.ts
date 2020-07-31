import { Module } from '@nestjs/common';

import { CategoriesListRepositoryModule } from '../shared/repositories/categories-list';
import { CategoryVersionRepositoryModule } from '../shared/repositories/category-version';
import { VersionsPackageRepositoryModule } from '../shared/repositories/versions-package';

import { CategoriesController } from './categories.controller';
import { CategoriesDetailsService } from './services';

@Module({
  imports: [CategoriesListRepositoryModule, CategoryVersionRepositoryModule, VersionsPackageRepositoryModule],
  controllers: [CategoriesController],
  providers: [CategoriesDetailsService],
})
export class CategoriesModule {}
