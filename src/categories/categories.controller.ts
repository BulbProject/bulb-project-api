import { ClassSerializerInterceptor, Controller, Get, HttpStatus, Param, Query, UseInterceptors } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { CategoriesListEntry, CategoriesListRepositoryService } from '../shared/repositories/categories-list';
import { CategoryVersion, CategoryVersionRepositoryService } from '../shared/repositories/category-version';
import { VersionsPackage, VersionsPackageRepositoryService } from '../shared/repositories/versions-package';
import { apiException, Exception } from '../shared/utils';

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
  @ApiExtraModels(CategoriesListEntry, CategoryDetails)
  @ApiOkResponse({
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(CategoriesListEntry),
        },
        {
          $ref: getSchemaPath(CategoryDetails),
        },
      ],
    },
    status: HttpStatus.OK,
  })
  @ApiQuery({
    name: 'details',
    type: 'boolean',
    example: 'false',
    required: false,
  })
  @ApiNotFoundResponse(apiException('No categories were found'))
  @ApiInternalServerErrorResponse(apiException(Exception.InternalServerError))
  public async getListEntries(@Query('details') details?: boolean): Promise<CategoriesListEntry[] | CategoryDetails[]> {
    if (details) {
      return this.categoriesDetails.getCategoriesDetails();
    }

    return this.listEntries.findAll();
  }

  @Get(':categoryId')
  @ApiOkResponse({
    type: VersionsPackage,
  })
  @ApiNotFoundResponse(apiException('Release package for category 31500000-1 was not found'))
  @ApiInternalServerErrorResponse(apiException(Exception.InternalServerError))
  public async getCategory(
    @Param('categoryId')
    categoryId: string
  ): Promise<VersionsPackage> {
    return this.versionsPackages.getOne(categoryId);
  }

  @Get(':categoryId/:version')
  @ApiOkResponse({
    type: CategoryVersion,
  })
  @ApiNotFoundResponse(apiException('Category 31500000-1 with version v1 was not found'))
  @ApiInternalServerErrorResponse(apiException(Exception.InternalServerError))
  public async getCategoryVersion(
    @Param('categoryId')
    categoryId: string,
    @Param('version')
    version: string
  ): Promise<CategoryVersion> {
    return this.categoriesVersions.getOne([categoryId, version]);
  }
}
