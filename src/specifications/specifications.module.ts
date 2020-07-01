import { Module } from '@nestjs/common';

import { SpecificationRepositoryModule } from '../shared/modules/specification-repository';

import { SpecificationsController } from './specifications.controller';

@Module({
  imports: [SpecificationRepositoryModule],
  controllers: [SpecificationsController],
})
export class SpecificationsModule {}
