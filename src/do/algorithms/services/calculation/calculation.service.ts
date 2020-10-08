import { BadRequestException, Injectable } from '@nestjs/common';

import { AlgorithmsService } from '../../algorithms.service';

import { ConformanceService } from '../../../services/conformance';

import type { CalculationResponse } from '../../../entity/calculation';
import { RequestedNeed } from '../../../entity/requested-need';

@Injectable()
export class CalculationService {
  public constructor(private algorithms: AlgorithmsService, private conformance: ConformanceService) {}

  public async getCalculation(
    [categoryId, version]: [string, string],
    requestedNeed: RequestedNeed
  ): Promise<CalculationResponse> {
    // TODO: add validation for empty body request
    if (Object.keys(requestedNeed).length === 0) {
      throw new BadRequestException(`Requested body must be not an empty object.`);
    }

    const categoryVersion = await this.conformance.getCategory(categoryId, version);

    return this.algorithms.getCalculation(categoryId, {
      category: categoryVersion.category,
      version,
      requestedNeed,
    });
  }
}
