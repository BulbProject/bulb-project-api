import { Body, Controller, HttpCode, Param, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
  ApiTags,
  ApiExtraModels,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { ApiException } from 'shared/entity';
import { HttpExceptionFilter } from 'shared/filters';

import { ExistingAlgorithmGuard } from './guards';

import { CalculationResponse } from './entity/calculation';
import { SpecificationId, QueryDto } from './entity/specification';
import type { SpecificationResponse } from './entity/specification';
import { RequestedNeed } from './entity/requested-need';
import { SpecificationBody } from './entity/selected-variant';

import { CalculationService, SpecificationService } from './algorithms/services';
import { DocxHeadersInterceptor } from './interceptors';

@Controller('do')
@ApiTags('Do')
export class DoController {
  public constructor(private calculation: CalculationService, private specification: SpecificationService) {}

  @Post('calculation/:categoryId/:version')
  @UseGuards(ExistingAlgorithmGuard)
  @HttpCode(200)
  @UseFilters(HttpExceptionFilter)
  @ApiBody({ type: RequestedNeed })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async getCalculation(
    @Param('categoryId') categoryId: string,
    @Param('version') version: string,
    @Body()
    requestedNeed: RequestedNeed
  ): Promise<CalculationResponse> {
    return this.calculation.getCalculation([categoryId, version], requestedNeed);
  }

  @Post('specification/:categoryId/:version')
  @UseGuards(ExistingAlgorithmGuard)
  @UseFilters(HttpExceptionFilter)
  @UseInterceptors(DocxHeadersInterceptor)
  @ApiQuery({
    name: 'egp',
    enum: ['prozorro'],
  })
  @ApiQuery({
    name: 'mode',
    enum: ['json', 'docx'],
  })
  @ApiBody({ type: SpecificationBody })
  @ApiExtraModels(SpecificationId)
  @ApiOkResponse({
    content: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { example: 'string' },
    },
  })
  @ApiCreatedResponse({
    schema: {
      example: { id: 'string' },
    },
  })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async getSpecification(
    @Param('categoryId') categoryId: string,
    @Param('version') version: string,
    @Query() query: QueryDto,
    @Body()
    specificationBody: SpecificationBody
  ): SpecificationResponse {
    return this.specification.getSpecification([categoryId, version], [query.egp, query.mode], specificationBody);
  }
}
