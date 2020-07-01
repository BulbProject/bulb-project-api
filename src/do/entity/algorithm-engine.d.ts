import type { CalculationPayload, CalculationResponse } from './calculation';
import type { SpecificationPayload, SpecificationResponse } from './specification';

export interface AlgorithmEngine {
  readonly categoryId: string;

  getCalculation(payload: CalculationPayload): Promise<CalculationResponse>;

  getSpecification(payload: SpecificationPayload): SpecificationResponse;
}
