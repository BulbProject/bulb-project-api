import { Body, Controller, Param, Patch, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';

import { CategoryVersionRepositoryService } from '../shared/modules/category-version-repository';
import type { ManageResponse } from '../shared/entity';
import { Category } from '../shared/entity';

import { AuthenticationGuard, IdConformanceGuard } from './guards';

import { IdValidatorPipe } from './pipes';

@Controller('manage')
@ApiBasicAuth()
@UseGuards(AuthenticationGuard)
export class ManageController {
  public constructor(private categoryVersion: CategoryVersionRepositoryService) {}

  @Post('add/categories/:categoryId')
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
  public async activateCategory(
    @Param('categoryId')
    categoryId: string,
    @Param('version')
    version: string
  ): Promise<ManageResponse> {
    return this.categoryVersion.updateStatus([categoryId, version]);
  }
}
