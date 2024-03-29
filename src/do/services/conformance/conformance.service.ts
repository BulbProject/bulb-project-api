import { BadRequestException, Injectable } from '@nestjs/common';

import { getLastVersionNumber } from 'shared/utils';
import { VersionsPackageRepositoryService } from 'shared/repositories/versions-package';
import { CategoryVersion, CategoryVersionRepositoryService } from 'shared/repositories/category-version';

@Injectable()
export class ConformanceService {
  public constructor(
    private versionsPackage: VersionsPackageRepositoryService,
    private categories: CategoryVersionRepositoryService
  ) {}

  public async getCategory(categoryId: string, version: string): Promise<CategoryVersion> {
    const versionsPackages = await this.versionsPackage.getOne(categoryId);

    const lastVersion = getLastVersionNumber(versionsPackages.versions);

    const versionNumber = Number(version.slice(1));

    if (versionNumber > lastVersion || versionNumber < 1) {
      throw new BadRequestException(`Category version does not exist.`);
    }

    if (versionNumber < lastVersion) {
      throw new BadRequestException(`Calculation is impossible for archived version.`);
    }

    const categoryVersion = await this.categories.getOne(categoryId, version);

    if (categoryVersion.status !== 'active') {
      throw new BadRequestException('Calculation is only possible for active category.');
    }

    return categoryVersion;
  }
}
