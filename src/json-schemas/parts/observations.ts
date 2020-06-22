import { array, mixed, object, string } from '../primitives';
import { value } from './value';

export const observations = array({
  minItems: 1,
  items: object({
    required: ['id'],
    properties: {
      id: string(),
      notes: string(),
      measure: mixed(['string', 'number', 'integer']),
      value,
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
