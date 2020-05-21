import { array, numeric, object, string } from './primitives';

import { criteria, metrics } from './parts';

export const availableVariants = object({
  required: ['category', 'version', 'availableVariants'],
  properties: {
    category: string(),
    version: string(),
    availableVariants: array({
      minItems: 1,
      items: object({
        required: ['id', 'relatedItem', 'quantity', 'metrics', 'avgValue', 'relatedProducts'],
        properties: {
          id: string(),
          relatedItem: string(),
          quantity: numeric(),
          metrics,
          avgValue: object({
            required: ['amount', 'currency'],
            properties: {
              amount: numeric(),
              currency: string(),
            },
          }),
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
