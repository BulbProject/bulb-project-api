import { Injectable } from '@nestjs/common';

import { SpecificationRepositoryService } from '../../shared/repositories/specification';

import type { AlgorithmEngine } from '../entity';
import type { CalculationPayload, CalculationResponse } from '../entity/calculation';
import type { SpecificationPayload, SpecificationResponse } from '../entity/specification';

import { CsvService, DocxGeneratorService } from '../services';

import {
  ElectricMotors,
  LightingEquipmentAndElectricLamps,
  WaterPumps,
  Transformers,
  IndustrialFans,
} from './categories';

@Injectable()
export class AlgorithmsService {
  public readonly algorithms: Record<string, AlgorithmEngine> = {
    '31500000-1': new LightingEquipmentAndElectricLamps(this.csv, this.specifications, this.docxGenerator),
    '31110000-0': new ElectricMotors(this.csv),
    '42122130-0': new WaterPumps(this.csv),
    '31170000-8': new Transformers(this.csv),
    '42522000-1': new IndustrialFans(this.csv),
  };

  public constructor(
    private csv: CsvService,
    private specifications: SpecificationRepositoryService,
    private docxGenerator: DocxGeneratorService
  ) {}

  public async getCalculation(categoryId: string, payload: CalculationPayload): Promise<CalculationResponse> {
    return this.algorithms[categoryId].getCalculation(payload);
  }

  public async getSpecification(categoryId: string, payload: SpecificationPayload): SpecificationResponse {
    return this.algorithms[categoryId].getSpecification(payload);
  }
}
