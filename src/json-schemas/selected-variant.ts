import { array, numeric, object, string } from './primitives';

import { metrics, requirementResponses } from './parts';

export const selectedVariant = object({
  required: ['selectedVariant'],
  properties: {
    selectedVariant: object({
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
        requirementResponses,
      },
    }),
  },
});
