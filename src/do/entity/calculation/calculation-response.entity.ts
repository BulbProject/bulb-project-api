import { AvailableVariant } from '../available-variant';

export class CalculationResponse {
  public category: string;

  public version: string;

  public requestedVariant?: string;

  public recommendedVariant?: string;

  public availableVariants: AvailableVariant[];
}
