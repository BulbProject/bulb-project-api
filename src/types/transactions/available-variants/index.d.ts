import type { Value } from 'ts4ocds';

import type { Metric } from 'ts4ocds/extensions/metrics';

interface AvailableVariant {
  id: string;
  relatedItem: string;
  quantity: number;
  metrics: Metric[];
  avgValue: Value;
  relatedProducts: string[];
}

export interface AvailableVariants {
  category: string;
  version: string;
  availableVariants: AvailableVariant[];
}
