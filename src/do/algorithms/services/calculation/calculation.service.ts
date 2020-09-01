import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { CategoryVersionRepositoryService } from 'shared/repositories/category-version';
import { VersionsPackageRepositoryService } from 'shared/repositories/versions-package';
import { getLastVersionNumber } from 'shared/utils/get-last-version-number';

import { AlgorithmsService } from '../../algorithms.service';

import type { CalculationResponse } from '../../../entity/calculation';
import { RequestedNeed } from '../../../entity/requested-need';

@Injectable()
export class CalculationService {
  public constructor(
    private versionsPackage: VersionsPackageRepositoryService,
    private categories: CategoryVersionRepositoryService,
    private algorithms: AlgorithmsService
  ) {}

  public async getCalculation(
    [categoryId, version]: [string, string],
    requestedNeed: RequestedNeed
  ): Promise<CalculationResponse> {
    if (Object.keys(requestedNeed).length === 0) {
      throw new BadRequestException(`Requested body is empty.`);
    }

    if (!(categoryId in this.algorithms.algorithms)) {
      throw new InternalServerErrorException(`Algorithm for category ${categoryId} do not exist.`);
    }

    const versionsPackage = await this.versionsPackage.getOne(categoryId);

    const lastVersion = Number(getLastVersionNumber(versionsPackage.versions));

    const versionNumber = Number(version.slice(1));

    if (versionNumber > lastVersion || versionNumber < 1) {
      throw new BadRequestException(`Category version do not exist.`);
    }

    if (versionNumber < lastVersion) {
      throw new BadRequestException(`Calculation is impossible for archive version.`);
    }

    const categoryVersion = await this.categories.getOne([categoryId, version]);

    if (categoryVersion.status === 'pending') {
      throw new BadRequestException('Calculation is impossible because category status is pending.');
    }

    return this.algorithms.getCalculation(categoryId, {
      category: categoryVersion.category,
      version,
      requestedNeed,
    });
  }
}
