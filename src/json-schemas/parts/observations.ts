import { array, mixed, numeric, object, string } from '../primitives';

export const observations = array({
  minItems: 1,
  items: object({
    required: ['id'],
    properties: {
      id: string(),
      notes: string(),
      measure: mixed(['string', 'number', 'integer']),
      value: object({
        required: ['amount', 'currency'],
        properties: {
          amount: numeric(),
          currency: string(),
        },
      }),
      unit: object({
        required: ['id', 'name'],
        properties: {
          id: string(),
          name: string(),
        },
      }),
    },
  }),
});
