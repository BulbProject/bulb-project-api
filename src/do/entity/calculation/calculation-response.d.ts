import { AvailableVariant } from '../available-variant';

// @ToDo: change to class
export interface CalculationResponse {
  category: string;
  version: string;
  requestedVariant?: string;
  recommendedVariant?: string;
  availableVariants: AvailableVariant[];
}
