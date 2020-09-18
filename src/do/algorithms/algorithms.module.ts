import { Module } from '@nestjs/common';

import { CategoryVersionRepositoryModule } from 'shared/repositories/category-version';
import { SpecificationRepositoryModule } from 'shared/repositories/specification';
import { VersionsPackageRepositoryModule } from 'shared/repositories/versions-package';

import { ConformanceModule } from '../services/conformance/conformance.module';
import { DocumentsService, DocxGeneratorService, CsvService } from '../services';

import { SpecificationService, CalculationService } from './services';
import { AlgorithmsService } from './algorithms.service';

import {
  ElectricMotors,
  LightingEquipmentAndElectricLamps,
  WaterPumps,
  Transformers,
  IndustrialFans,
} from './categories';

const algorithms = [LightingEquipmentAndElectricLamps, ElectricMotors, WaterPumps, Transformers, IndustrialFans];

@Module({
  imports: [
    CategoryVersionRepositoryModule,
    SpecificationRepositoryModule,
    VersionsPackageRepositoryModule,
    ConformanceModule,
  ],
  providers: [
    AlgorithmsService,
    ...algorithms,
    SpecificationService,
    CalculationService,
    DocumentsService,
    DocxGeneratorService,
    CsvService,
  ],
  exports: [AlgorithmsService, ...algorithms, SpecificationService, CalculationService],
})
export class AlgorithmsModule {}
