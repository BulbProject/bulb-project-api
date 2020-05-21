import { array, object, string, mixed } from '../primitives';

export const criteria = array({
  minItems: 1,
  items: object({
    required: [],
    properties: {
      id: string(),
      title: string(),
      description: string(),
      requirementGroups: array({
        minItems: 1,
        items: object({
          required: [],
          properties: {
            description: string(),
            requirements: array({
              minItems: 1,
              items: object({
                required: [],
                properties: {
                  id: string(),
                  title: string(),
                  description: string(),
                  dataType: string({ enum: ['boolean', 'string', 'number', 'integer'] }),
                  expectedValue: mixed(['boolean', 'string', 'number', 'integer']),
                  minValue: mixed(['number', 'integer']),
                  maxValue: mixed(['number', 'integer']),
                  unit: object({
                    required: ['id', 'name'],
                    properties: {
                      id: string(),
                      name: string(),
                    },
                  }),
                },
              }),
            }),
          },
        }),
      }),
    },
  }),
});
