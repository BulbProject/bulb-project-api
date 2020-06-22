import type { Value } from 'ts4ocds';

import type { Metric } from 'ts4ocds/extensions/metrics';
import type { RequirementResponse } from 'ts4ocds/extensions/requirements';

export interface SelectedVariant {
  selectedVariant: {
    id: string;
    relatedItem: string;
    quantity: number;
    metrics: Metric[];
    avgValue: Value;
    relatedProducts: string[];
    requirementResponses: RequirementResponse[];
  };
}
