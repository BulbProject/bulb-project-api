import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import { SpecificationRepositoryService } from '../shared/repositories/specification';
import { Specification } from '../shared/repositories/specification/models';
import { apiException, Exception } from '../shared/utils';

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
  @ApiNotFoundResponse(apiException('Specification with id k34yiufgw-fhui2y4-fweg-353r was not found'))
  @ApiInternalServerErrorResponse(apiException(Exception.InternalServerError))
  public async getSpecification(
    @Param('specificationId')
    specificationId: string
  ): Promise<Specification> {
    return this.specifications.getOne(specificationId);
  }
}
