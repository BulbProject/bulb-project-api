import type { Value } from 'ts4ocds';

import type { Metric } from './metric';

interface AvailableVariant {
  id: string;
  relatedItem: string;
  quantity: number;
  forecasts: Metric[];
  targets: Metric[];
  avgValue: Value;
  relatedProducts: string[];
}

export interface AvailableVariants {
  category: string;
  version: string;
  availableVariants: AvailableVariant[];
}
