import { Module } from '@nestjs/common';

import { CategoryVersionRepositoryModule } from '../../shared/repositories/category-version';
import { SpecificationRepositoryModule } from '../../shared/repositories/specification';
import { VersionsPackageRepositoryModule } from '../../shared/repositories/versions-package';

import { DocumentsService, DocxGeneratorService, CsvService } from '../services';

import { AlgorithmsService } from './algorithms.service';
import { ElectricMotors, LightingEquipmentAndElectricLamps, WaterPumps } from './categories';
import { SpecificationService, CalculationService } from './services';

const algorithms = [
  AlgorithmsService,
  LightingEquipmentAndElectricLamps,
  ElectricMotors,
  WaterPumps,
  SpecificationService,
  CalculationService,
];

@Module({
  imports: [CategoryVersionRepositoryModule, SpecificationRepositoryModule, VersionsPackageRepositoryModule],
  providers: [...algorithms, DocumentsService, DocxGeneratorService, CsvService],
  exports: algorithms,
})
export class AlgorithmsModule {}
