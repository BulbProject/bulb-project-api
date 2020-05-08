import { array, object, string, numeric } from './primitives';

import { metrics } from './metrics';

export const availableVariants = object({
  required: ['category', 'version', 'availableVariants'],
  properties: {
    category: string(),
    version: string(),
    availableVariants: array({
      minItems: 1,
      items: object({
        required: [],
        properties: {
          id: string(),
          relatedItem: string(),
          quantity: numeric(),
          forecasts: metrics,
          targets: metrics,
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
        },
      }),
    }),
  },
});
