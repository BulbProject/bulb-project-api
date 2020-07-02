import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesListRepositoryModule } from '../categories-list';
import { VersionsPackageRepositoryModule } from '../versions-package';

import { CategoryVersionRepositoryService } from './category-version-repository.service';
import { CategoryVersion } from './models';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryVersion]),
    VersionsPackageRepositoryModule,
    CategoriesListRepositoryModule,
  ],
  exports: [CategoryVersionRepositoryService],
  providers: [CategoryVersionRepositoryService],
})
export class CategoryVersionRepositoryModule {}
