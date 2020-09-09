import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { ApiException } from 'shared/entity';
import { SpecificationRepositoryService } from '../shared/repositories/specification';
import { Specification } from '../shared/repositories/specification/models';

@Controller('specifications')
@ApiTags('Specification')
@ApiInternalServerErrorResponse()
export class SpecificationsController {
  public constructor(private specifications: SpecificationRepositoryService) {}

  @Get(':categoryId/:version/:calculationId/:variantId')
  @ApiExcludeEndpoint()
  public getVariant(
    @Param('categoryId') categoryId: string,
    @Param('version') version: string,
    @Param('calculationId') calculationId: string,
    @Param('variantId') variantId: string,
    @Query('egp') egp: 'prozorro',
    @Query('mode') mode: 'json' | 'docx'
  ): string {
    return `Specification for specific good from category chosen for:
      categoryId ${categoryId},
      version ${version},
      calculationId ${calculationId},
      variantId ${variantId}.
      And query params:
      egp ${egp},
      mode ${mode}`;
  }

  @Get(':specificationId')
  @ApiOkResponse({ type: Specification, status: HttpStatus.OK })
  @ApiNotFoundResponse({ type: ApiException })
  @ApiInternalServerErrorResponse({ type: ApiException })
  public async getSpecification(
    @Param('specificationId')
    specificationId: string
  ): Promise<Specification> {
    return this.specifications.getOne(specificationId);
  }
}
