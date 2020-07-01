import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesListRepositoryModule } from '../categories-list-repository';
import { VersionsPackageRepositoryModule } from '../versions-package-repository';

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
