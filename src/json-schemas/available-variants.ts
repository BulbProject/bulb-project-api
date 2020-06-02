import { array, numeric, object, string } from './primitives';

import { criteria, metrics, value } from './parts';

export const availableVariants = object({
  required: ['category', 'version', 'availableVariants'],
  properties: {
    category: string(),
    version: string(),
    availableVariants: array({
      minItems: 1,
      items: object({
        required: ['id', 'relatedItem', 'quantity', 'metrics'],
        properties: {
          id: string(),
          relatedItem: string(),
          quantity: numeric(),
          metrics,
          avgValue: value,
          relatedProducts: array({
            minItems: 1,
            items: string(),
          }),
          criteria,
        },
      }),
    }),
  },
});
