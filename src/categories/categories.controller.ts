import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseBoolPipe,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { ApiException } from 'shared/entity';
import { HttpExceptionFilter } from 'shared/filters';
import { CategoriesListEntry, CategoriesListRepositoryService } from 'shared/repositories/categories-list';
import { CategoryVersion, CategoryVersionRepositoryService } from 'shared/repositories/category-version';
import { VersionsPackage, VersionsPackageRepositoryService } from 'shared/repositories/versions-package';

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
  @UseFilters(HttpExceptionFilter)
  @ApiOkResponse({
    schema: {
      example: {
        id: 'string',
        version: 'string',
        date: 'string',
      },
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
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async getListEntries(
    @Query('details', ParseBoolPipe) details?: boolean
  ): Promise<CategoriesListEntry[] | CategoryDetails[]> {
    if (details) {
      return this.categoriesDetails.getCategoriesDetails();
    }

    return this.listEntries.findAll();
  }

  @Get(':categoryId')
  @UseFilters(HttpExceptionFilter)
  @ApiOkResponse({
    type: VersionsPackage,
  })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async getCategory(
    @Param('categoryId')
    categoryId: string
  ): Promise<VersionsPackage | null> {
    return this.versionsPackages.getOne(categoryId);
  }

  @Get(':categoryId/:version')
  @UseFilters(HttpExceptionFilter)
  @ApiOkResponse({
    type: CategoryVersion,
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async getCategoryVersion(
    @Param('categoryId')
    categoryId: string,
    @Param('version')
    version: string
  ): Promise<CategoryVersion> {
    return this.categoriesVersions.getOne(categoryId, version);
  }
}
