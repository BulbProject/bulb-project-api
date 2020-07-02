import { Body, Controller, Param, Patch, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiBody,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { Category, ManageResponse } from '../shared/entity';

import { CategoryVersionRepositoryService } from '../shared/repositories/category-version';
import { apiException, Exception } from '../shared/utils';

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
  @ApiBody({ type: Category })
  @ApiOkResponse({ type: ManageResponse })
  @ApiInternalServerErrorResponse(apiException(Exception.InternalServerError))
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
  @ApiNotFoundResponse(apiException('Could not update version for category with id 31500000-0'))
  @ApiInternalServerErrorResponse(apiException(Exception.InternalServerError))
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
  @ApiNotFoundResponse(apiException('Category 31500000-1 with version v1 was not found'))
  @ApiInternalServerErrorResponse(apiException(Exception.InternalServerError))
  public async activateCategory(
    @Param('categoryId')
    categoryId: string,
    @Param('version')
    version: string
  ): Promise<ManageResponse> {
    return this.categoryVersion.updateStatus([categoryId, version]);
  }
}
