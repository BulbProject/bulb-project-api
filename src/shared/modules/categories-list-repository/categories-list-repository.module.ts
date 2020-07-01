import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesListRepositoryService } from './categories-list-repository.service';
import { CategoriesListEntry } from './models';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesListEntry])],
  exports: [CategoriesListRepositoryService],
  providers: [CategoriesListRepositoryService],
})
export class CategoriesListRepositoryModule {}
