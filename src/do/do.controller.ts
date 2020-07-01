import { Body, Controller, Param, Post, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';

import type { Egp, Mode } from './entity';
import type { CalculationResponse } from './entity/calculation';
import type { SpecificationResponse } from './entity/specification';

import { RequestedNeed } from './entity/requested-need';
import { SelectedVariant } from './entity/selected-variant';

import { CalculationService, SpecificationService } from './algorithms/services';
import { DocxHeadersInterceptor } from './interceptors';

@Controller('do')
export class DoController {
  public constructor(private calculation: CalculationService, private specification: SpecificationService) {}

  @Post('calculation/:categoryId/:version')
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
