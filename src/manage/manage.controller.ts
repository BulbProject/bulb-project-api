import { Body, Controller, Param, Patch, Post, Put, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { Category, ManageResponse, ApiException } from '../shared/entity';
import { HttpExceptionFilter } from '../shared/filters';

import { CategoryVersionRepositoryService } from '../shared/repositories/category-version';

import { AuthenticationGuard, IdConformanceGuard } from './guards';

import { IdValidatorPipe } from './pipes';

@Controller('manage')
@ApiBasicAuth()
@ApiTags('Manage')
@ApiInternalServerErrorResponse()
@UseGuards(AuthenticationGuard)
export class ManageController {
  public constructor(private categoryVersion: CategoryVersionRepositoryService) {}

  @Post('add/categories/:categoryId')
  @UseGuards(IdConformanceGuard)
  @UseFilters(HttpExceptionFilter)
  @ApiBody({ type: Category })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async addCategory(
    @Param('categoryId')
    categoryId: string,
    @Body(new IdValidatorPipe(), new ValidationPipe({ transform: true }))
    category: Category
  ): Promise<ManageResponse> {
    return this.categoryVersion.createOne(categoryId, category);
  }

  @Put('update/categories/:categoryId')
  @UseGuards(IdConformanceGuard)
  @ApiBody({ type: Category })
  @ApiOkResponse({ type: ManageResponse })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async updateCategory(
    @Param('categoryId')
    categoryId: string,
    @Body(new IdValidatorPipe(), new ValidationPipe({ transform: true }))
    category: Category
  ): Promise<ManageResponse> {
    return this.categoryVersion.updateVersion(categoryId, category);
  }

  @Patch('activate/categories/:categoryId/:version')
  @ApiOkResponse({ type: ManageResponse })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async activateCategory(
    @Param('categoryId')
    categoryId: string,
    @Param('version')
    version: string
  ): Promise<ManageResponse> {
    return this.categoryVersion.updateStatus([categoryId, version]);
  }
}
