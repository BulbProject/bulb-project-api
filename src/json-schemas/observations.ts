import { array, mixed, object, string } from './primitives';

export const observations = array({
  minItems: 1,
  items: object({
    required: ['id', 'measure'],
    properties: {
      id: string(),
      notes: string(),
      measure: mixed(['string', 'number', 'integer']),
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
