import type { Value } from 'ts4ocds';

import type { Metric } from 'ts4ocds/extensions/metrics';
import type { Criterion } from '../../parts';

interface AvailableVariant {
  id: string;
  relatedItem: string;
  quantity: number;
  metrics: Metric[];
  avgValue: Value;
  relatedProducts: string[];
  criteria?: Criterion[];
}

export interface AvailableVariants {
  category: string;
  version: string;
  availableVariants: AvailableVariant[];
}
