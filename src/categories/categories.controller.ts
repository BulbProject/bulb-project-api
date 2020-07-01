import { ClassSerializerInterceptor, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { CategoriesListEntry, CategoriesListRepositoryService } from '../shared/modules/categories-list-repository';

import { CategoryVersion, CategoryVersionRepositoryService } from '../shared/modules/category-version-repository';

import { VersionsPackage, VersionsPackageRepositoryService } from '../shared/modules/versions-package-repository';

import { CategoryDetails } from './entity';
import { CategoriesDetailsService } from './services';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
  public constructor(
    private listEntries: CategoriesListRepositoryService,
    private versionsPackages: VersionsPackageRepositoryService,
    private categoriesVersions: CategoryVersionRepositoryService,
    private categoriesDetails: CategoriesDetailsService
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: CategoriesListEntry,
    isArray: true,
  })
  public async getListEntries(@Query('details') details?: boolean): Promise<CategoriesListEntry[] | CategoryDetails[]> {
    if (details) {
      return this.categoriesDetails.getCategoriesDetails();
    }

    return this.listEntries.findAll();
  }

  @Get(':categoryId')
  @ApiCreatedResponse({
    type: VersionsPackage,
  })
  public async getCategory(
    @Param('categoryId')
    categoryId: string
  ): Promise<VersionsPackage> {
    return this.versionsPackages.getOne(categoryId);
  }

  @Get(':categoryId/:version')
  @ApiCreatedResponse({
    type: CategoryVersion,
  })
  public async getCategoryVersion(
    @Param('categoryId')
    categoryId: string,
    @Param('version')
    version: string
  ): Promise<CategoryVersion> {
    return this.categoriesVersions.getOne([categoryId, version]);
  }
}
