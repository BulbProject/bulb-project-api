import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

import { SpecificationRepositoryService } from '../shared/modules/specification-repository';
import { Specification } from '../shared/modules/specification-repository/models';

@Controller('specification')
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

  @Get(':categoryId/:version/:specificationId')
  public async getSpecification(
    @Param('categoryId') categoryId: string,
    @Param('version') version: string,
    @Param('specificationId')
    specificationId: string
  ): Promise<Specification> {
    return this.specifications.getOne([categoryId, version, specificationId]);
  }
}
