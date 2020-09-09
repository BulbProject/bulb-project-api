import { Module } from '@nestjs/common';

import { VersionsPackageRepositoryModule } from 'shared/repositories/versions-package';
import { CategoryVersionRepositoryModule } from 'shared/repositories/category-version';

import { ConformanceService } from './conformance.service';

@Module({
  imports: [VersionsPackageRepositoryModule, CategoryVersionRepositoryModule],
  providers: [ConformanceService],
  exports: [ConformanceService],
})
export class ConformanceModule {}
