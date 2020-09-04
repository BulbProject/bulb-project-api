import { Module } from '@nestjs/common';

import { CategoryVersionRepositoryModule } from 'shared/repositories/category-version';
import { SpecificationRepositoryModule } from 'shared/repositories/specification';
import { VersionsPackageRepositoryModule } from 'shared/repositories/versions-package';

import { ConformanceModule } from '../services/conformance/conformance.module';
import { DocumentsService, DocxGeneratorService, CsvService } from '../services';
import { SpecificationService, CalculationService } from './services';

import { AlgorithmsService } from './algorithms.service';
import { ElectricMotors, LightingEquipmentAndElectricLamps, WaterPumps } from './categories';

const algorithms = [
  AlgorithmsService,
  LightingEquipmentAndElectricLamps,
  ElectricMotors,
  WaterPumps,
  SpecificationService,
  CalculationService,
];

@Module({
  imports: [
    CategoryVersionRepositoryModule,
    SpecificationRepositoryModule,
    VersionsPackageRepositoryModule,
    ConformanceModule,
  ],
  providers: [...algorithms, DocumentsService, DocxGeneratorService, CsvService],
  exports: algorithms,
})
export class AlgorithmsModule {}
