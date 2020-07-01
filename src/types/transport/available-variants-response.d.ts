import { AvailableVariant } from '../transactions';

export interface AvailableVariantsResponse {
  category: string;
  version: string;
  requestedVariant?: string;
  recommendedVariant: string;
  availableVariants: AvailableVariant[];
}
