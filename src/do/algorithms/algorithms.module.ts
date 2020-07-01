import { Module } from '@nestjs/common';

import { CategoryVersionRepositoryModule } from '../../shared/modules/category-version-repository';
import { SpecificationRepositoryModule } from '../../shared/modules/specification-repository';

import { DocumentsService, DocxGeneratorService } from '../services';

import { AlgorithmsService } from './algorithms.service';
import { LightingEquipmentAndElectricLamps } from './categories';
import { SpecificationService, CalculationService } from './services';

const algorithms = [AlgorithmsService, LightingEquipmentAndElectricLamps, SpecificationService, CalculationService];

@Module({
  imports: [CategoryVersionRepositoryModule, SpecificationRepositoryModule],
  providers: [...algorithms, DocumentsService, DocxGeneratorService],
  exports: algorithms,
})
export class AlgorithmsModule {}
