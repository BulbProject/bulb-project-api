import { Body, Controller, Param, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
  ApiTags,
  ApiExtraModels,
  getSchemaPath,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ApiException } from 'shared/entity';

import type { Egp, Mode } from './entity';
import { CalculationPayload, CalculationResponse } from './entity/calculation';
import { SpecificationId } from './entity/specification';
import type { SpecificationResponse } from './entity/specification';

import { RequestedNeed } from './entity/requested-need';
import { SelectedVariant } from './entity/selected-variant';

import { CalculationService, SpecificationService } from './algorithms/services';
import { DocxHeadersInterceptor } from './interceptors';

@Controller('do')
@ApiTags('Do')
export class DoController {
  public constructor(private calculation: CalculationService, private specification: SpecificationService) {}

  @Post('calculation/:categoryId/:version')
  @ApiBody({ type: RequestedNeed })
  @ApiOkResponse({ type: CalculationPayload })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async getCalculation(
    @Param('categoryId') categoryId: string,
    @Param('version') version: string,
    @Body('requestedNeed', new ValidationPipe({ transform: true }))
    requestedNeed: RequestedNeed
  ): Promise<CalculationResponse> {
    return this.calculation.getCalculation([categoryId, version], requestedNeed);
  }

  @Post('specification/:categoryId/:version')
  @UseInterceptors(DocxHeadersInterceptor)
  @ApiQuery({
    name: 'egp',
    enum: ['prozorro'],
  })
  @ApiQuery({
    name: 'mode',
    enum: ['json', 'docx'],
  })
  @ApiBody({ type: SelectedVariant })
  @ApiExtraModels(SpecificationId)
  @ApiOkResponse({
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(SpecificationId),
        },
        {
          type: 'string',
          description: 'Buffer',
        },
      ],
    },
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnprocessableEntityResponse({ description: 'Unprocessable entity' })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async getSpecification(
    @Param('categoryId') categoryId: string,
    @Param('version') version: string,
    @Query('egp') egp: Egp,
    @Query('mode') mode: Mode,
    @Body('selectedVariant', new ValidationPipe({ transform: true }))
    selectedVariant: SelectedVariant
  ): SpecificationResponse {
    return this.specification.getSpecification([categoryId, version], [egp, mode], {
      // Somehow ClassSerializer moves content of the `selectedVariant` property to the root object
      // @ts-ignore
      selectedVariant,
    });
  }
}
