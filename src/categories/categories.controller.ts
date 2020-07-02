import { ClassSerializerInterceptor, Controller, Get, HttpStatus, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { CategoriesListEntry, CategoriesListRepositoryService } from '../shared/modules/categories-list-repository';

import { CategoryVersion, CategoryVersionRepositoryService } from '../shared/modules/category-version-repository';

import { VersionsPackage, VersionsPackageRepositoryService } from '../shared/modules/versions-package-repository';
import { apiException } from '../shared/utils';

import { CategoryDetails } from './entity';
import { CategoriesDetailsService } from './services';

@Controller('categories')
@ApiTags('Categories')
@UseInterceptors(ClassSerializerInterceptor)
export class CategoriesController {
  public constructor(
    private listEntries: CategoriesListRepositoryService,
    private versionsPackages: VersionsPackageRepositoryService,
    private categoriesVersions: CategoryVersionRepositoryService,
    private categoriesDetails: CategoriesDetailsService
  ) {}

  @Get()
  @ApiImplicitQuery({
    name: 'details',
    required: false,
    type: Boolean,
  })
  @ApiCreatedResponse({
    type: [CategoriesListEntry],
    status: HttpStatus.OK,
  })
  @ApiQuery({
    name: 'details',
    type: 'boolean',
  })
  @ApiNotFoundResponse(apiException(`No categories were found`, HttpStatus.NOT_FOUND))
  public async getListEntries(@Query('details') details?: boolean): Promise<CategoriesListEntry[] | CategoryDetails[]> {
    if (details) {
      return this.categoriesDetails.getCategoriesDetails();
    }

    return this.listEntries.findAll();
  }

  @Get(':categoryId')
  @ApiCreatedResponse({
    type: VersionsPackage,
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse(apiException(`Release package for category 31500000-1 was not found`, HttpStatus.NOT_FOUND))
  public async getCategory(
    @Param('categoryId')
    categoryId: string
  ): Promise<VersionsPackage> {
    return this.versionsPackages.getOne(categoryId);
  }

  @Get(':categoryId/:version')
  @ApiCreatedResponse({
    type: CategoryVersion,
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse(apiException(`Category 31500000-1 with version v1 was not found`, HttpStatus.NOT_FOUND))
  public async getCategoryVersion(
    @Param('categoryId')
    categoryId: string,
    @Param('version')
    version: string
  ): Promise<CategoryVersion> {
    return this.categoriesVersions.getOne([categoryId, version]);
  }
}
