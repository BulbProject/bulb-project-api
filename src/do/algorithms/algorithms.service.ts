import { Injectable } from '@nestjs/common';

import { SpecificationRepositoryService } from '../../shared/modules/specification-repository';

import type { AlgorithmEngine } from '../entity';
import type { CalculationPayload, CalculationResponse } from '../entity/calculation';
import type { SpecificationPayload, SpecificationResponse } from '../entity/specification';

import { DocumentsService, DocxGeneratorService } from '../services';

import { LightingEquipmentAndElectricLamps } from './categories';

@Injectable()
export class AlgorithmsService {
  private readonly algorithms: Record<string, AlgorithmEngine> = {
    '31500000-1': new LightingEquipmentAndElectricLamps(this.documents, this.specifications, this.docxGenerator),
  };

  public constructor(
    private documents: DocumentsService,
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
