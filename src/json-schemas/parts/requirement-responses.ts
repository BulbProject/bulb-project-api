import { array, mixed, object, string } from '../primitives';

export const requirementResponses = array({
  minItems: 1,
  items: object({
    required: ['id', 'value', 'requirement'],
    properties: {
      id: string(),
      value: mixed(['boolean', 'string', 'number', 'integer'], {
        title: 'May be "boolean" | "string" | "number" | "integer" type',
      }),
      requirement: object({
        required: ['id'],
        properties: {
          id: string(),
        },
      }),
    },
  }),
});
