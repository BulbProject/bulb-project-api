import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SpecificationRepositoryModule } from '../../shared/repositories/specification';

import { specificationCleanerConfig, SpecificationCleanerService } from './services/specification-cleaner';

@Module({
  imports: [ConfigModule.forFeature(specificationCleanerConfig), SpecificationRepositoryModule],
  providers: [SpecificationCleanerService],
})
export class CronModule {}
