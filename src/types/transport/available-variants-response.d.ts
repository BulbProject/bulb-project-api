import { AvailableVariant } from '../transactions';

export interface AvailableVariantsResponse {
  category: string;
  version: string;
  availableVariants: AvailableVariant[];
}
