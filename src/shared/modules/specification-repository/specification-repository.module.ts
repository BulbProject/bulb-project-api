import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Specification } from './models';
import { SpecificationRepositoryService } from './specification-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([Specification])],
  providers: [SpecificationRepositoryService],
  exports: [SpecificationRepositoryService],
})
export class SpecificationRepositoryModule {}
