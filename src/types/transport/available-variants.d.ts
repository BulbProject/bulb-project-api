import { AvailableVariant } from '../transactions';

export interface AvailableVariants {
  category: string;
  version: string;
  availableVariants: AvailableVariant[];
}
