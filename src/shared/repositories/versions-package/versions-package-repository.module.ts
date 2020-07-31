import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VersionsPackage } from './models';
import { VersionsPackageRepositoryService } from './versions-package-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([VersionsPackage])],
  exports: [VersionsPackageRepositoryService],
  providers: [VersionsPackageRepositoryService],
})
export class VersionsPackageRepositoryModule {}
