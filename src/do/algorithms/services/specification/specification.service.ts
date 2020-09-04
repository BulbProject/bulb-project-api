import { BadRequestException, Injectable } from '@nestjs/common';

import { AlgorithmsService } from '../../algorithms.service';
import type { Egp, Mode } from '../../../entity';
import { SpecificationBody } from '../../../entity';
import type { SpecificationResponse } from '../../../entity/specification';

import { ConformanceService } from '../../../services/conformance';

@Injectable()
export class SpecificationService {
  public constructor(private algorithms: AlgorithmsService, private conformance: ConformanceService) {}

  public async getSpecification(
    [categoryId, version]: [string, string],
    [egp, mode]: [Egp, Mode],
    specificationBody: SpecificationBody
  ): SpecificationResponse {
    // TODO: add validation for empty body request
    if (Object.keys(specificationBody).length === 0) {
      throw new BadRequestException(`Request body should not be empty.`);
    }

    const categoryVersion = await this.conformance.getCategory(categoryId, version);

    if (
      !categoryVersion.category.items.find((item) => {
        return item.id === specificationBody.selectedVariant.relatedItem;
      })
    ) {
      throw new BadRequestException(`Field 'relatedItem' is not match.`);
    }

    return this.algorithms.getSpecification(categoryId, {
      category: categoryVersion.category,
      version,
      selectedVariant: specificationBody,
      egp,
      mode,
    });
  }
}
