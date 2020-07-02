import { Body, Controller, HttpStatus, Param, Patch, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';

import { Category, ManageResponse } from '../shared/entity';

import { CategoryVersionRepositoryService } from '../shared/modules/category-version-repository';
import { apiException } from '../shared/utils';

import { AuthenticationGuard, IdConformanceGuard } from './guards';

import { IdValidatorPipe } from './pipes';

@ApiTags('Manage')
@Controller('manage')
@ApiBasicAuth()
@UseGuards(AuthenticationGuard)
export class ManageController {
  public constructor(private categoryVersion: CategoryVersionRepositoryService) {}

  @Post('add/categories/:categoryId')
  @ApiBody({ type: Category })
  @ApiCreatedResponse({ type: ManageResponse, status: 200 })
  @ApiInternalServerErrorResponse(apiException('string', HttpStatus.INTERNAL_SERVER_ERROR))
  @UseGuards(IdConformanceGuard)
  public async addCategory(
    @Param('categoryId')
    categoryId: string,
    @Body(new IdValidatorPipe(), new ValidationPipe({ transform: true }))
    category: Category
  ): Promise<ManageResponse> {
    return this.categoryVersion.createOne(categoryId, category);
  }

  @Put('update/categories/:categoryId')
  @ApiBody({ type: Category })
  @ApiCreatedResponse({ type: ManageResponse, status: 200 })
  @ApiInternalServerErrorResponse(apiException('string', HttpStatus.INTERNAL_SERVER_ERROR))
  @UseGuards(IdConformanceGuard)
  public async updateCategory(
    @Param('categoryId')
    categoryId: string,
    @Body(new IdValidatorPipe(), new ValidationPipe({ transform: true }))
    category: Category
  ): Promise<ManageResponse> {
    return this.categoryVersion.updateVersion(categoryId, category);
  }

  @Patch('activate/categories/:categoryId/:version')
  @ApiCreatedResponse({ type: ManageResponse, status: 200 })
  @ApiInternalServerErrorResponse(apiException('string', HttpStatus.INTERNAL_SERVER_ERROR))
  public async activateCategory(
    @Param('categoryId')
    categoryId: string,
    @Param('version')
    version: string
  ): Promise<ManageResponse> {
    return this.categoryVersion.updateStatus([categoryId, version]);
  }
}
