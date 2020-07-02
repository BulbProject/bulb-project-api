import { Injectable } from '@nestjs/common';

import { CategoryVersionRepositoryService } from '../../../../shared/repositories/category-version';

import { AlgorithmsService } from '../../algorithms.service';
import type { Egp, Mode } from '../../../entity';
import { SelectedVariant } from '../../../entity';
import type { SpecificationResponse } from '../../../entity/specification';

@Injectable()
export class SpecificationService {
  public constructor(private categories: CategoryVersionRepositoryService, private algorithms: AlgorithmsService) {}

  public async getSpecification(
    [categoryId, version]: [string, string],
    [egp, mode]: [Egp, Mode],
    selectedVariant: SelectedVariant
  ): SpecificationResponse {
    const categoryVersion = await this.categories.getOne([categoryId, version]);

    return this.algorithms.getSpecification(categoryId, {
      category: categoryVersion.category,
      version,
      selectedVariant,
      egp,
      mode,
    });
  }
}
