import { Injectable } from '@nestjs/common';

import { AlgorithmsService } from '../../algorithms.service';
import { CategoryVersionRepositoryService } from '../../../../shared/modules/category-version-repository';
import type { CalculationResponse } from '../../../entity/calculation';
import { RequestedNeed } from '../../../entity/requested-need';

@Injectable()
export class CalculationService {
  public constructor(private categories: CategoryVersionRepositoryService, private algorithms: AlgorithmsService) {}

  public async getCalculation(
    [categoryId, version]: [string, string],
    requestedNeed: RequestedNeed
  ): Promise<CalculationResponse> {
    const categoryVersion = await this.categories.getOne([categoryId, version]);

    return this.algorithms.getCalculation(categoryId, {
      category: categoryVersion.category,
      version,
      requestedNeed,
    });
  }
}
