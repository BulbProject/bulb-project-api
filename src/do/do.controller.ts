import { Body, Controller, HttpStatus, Param, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import type { Egp, Mode } from './entity';
import { CalculationPayload, CalculationResponse } from './entity/calculation';
import type { SpecificationResponse } from './entity/specification';

import { RequestedNeed } from './entity/requested-need';
import { SelectedVariant } from './entity/selected-variant';

import { CalculationService, SpecificationService } from './algorithms/services';
import { DocxHeadersInterceptor } from './interceptors';

@ApiTags('Do')
@Controller('do')
export class DoController {
  public constructor(private calculation: CalculationService, private specification: SpecificationService) {}

  @Post('calculation/:categoryId/:version')
  @ApiCreatedResponse({ type: CalculationPayload, status: HttpStatus.OK })
  @ApiBody({ type: RequestedNeed })
  public async getCalculation(
    @Param('categoryId') categoryId: string,
    @Param('version') version: string,
    @Body('requestedNeed', new ValidationPipe({ transform: true }))
    requestedNeed: RequestedNeed
  ): Promise<CalculationResponse> {
    return this.calculation.getCalculation([categoryId, version], requestedNeed);
  }

  @Post('specification/:categoryId/:version')
  @ApiCreatedResponse({ status: HttpStatus.OK })
  @ApiBody({ type: SelectedVariant })
  @ApiQuery({
    name: 'egp',
    enum: ['prozorro'],
  })
  @ApiQuery({
    name: 'mode',
    enum: ['json', 'docx'],
  })
  @UseInterceptors(DocxHeadersInterceptor)
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
