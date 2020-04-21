import { array, mixed, object, string } from './primitives';

export const requestedNeed = object({
  required: ['id', 'requirementResponses'],
  properties: {
    id: string(),
    requirementResponses: array({
      items: object({
        required: ['id', 'value', 'requirement'],
        properties: {
          id: string(),
          value: mixed(['boolean', 'string', 'number', 'integer']),
          requirement: object({
            required: ['id'],
            properties: {
              id: string(),
            },
          }),
        },
      }),
    }),
  },
});
