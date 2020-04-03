import { classification } from './classification';
import { options } from './options';
import { period } from './period';
import { string, numeric, mixed, object, array } from './primitives';

export const category = object({
  required: ['id', 'title', 'description', 'classification', 'items', 'criteria', 'conversions'],
  properties: {
    id: string(),
    title: string(),
    description: string(),
    classification,
    items: array({
      minItems: 1,
      items: object({
        required: ['id', 'description', 'classification'],
        properties: {
          id: string(),
          description: string(),
          classification,
          additionalClassifications: array({ minItems: 1, items: classification }),
        },
      }),
    }),
    criteria: array({
      minItems: 1,
      items: object({
        required: ['id', 'title', 'requirementGroups'],
        properties: {
          id: string(),
          title: string(),
          description: string(),
          requirementGroups: array({
            minItems: 1,
            items: object({
              required: ['id', 'requirements'],
              properties: {
                id: string(),
                description: string(),
                requirements: array({
                  minItems: 1,
                  items: object({
                    required: ['id', 'title', 'dataType'],
                    properties: {
                      id: string(),
                      title: string(),
                      description: string(),
                      dataType: string({ enum: ['boolean', 'string', 'number', 'integer'] }),
                      expectedValue: mixed(['boolean', 'string', 'number', 'integer']),
                      minValue: numeric(),
                      maxValue: numeric(),
                      period,
                      optionDetails: object({
                        required: ['optionGroups'],
                        properties: {
                          optionGroups: array({
                            minItems: 1,
                            items: object({
                              required: ['id', 'relatesTo', 'options'],
                              properties: {
                                id: string(),
                                description: string(),
                                relatesTo: string({ enum: ['value'] }),
                                options,
                              },
                            }),
                          }),
                          optionsToCombine: array({
                            minItems: 1,
                            items: object({
                              required: ['id', 'relatedOptions'],
                              properties: {
                                id: string(),
                                relatedOptions: array({
                                  minItems: 1,
                                  items: string(),
                                }),
                              },
                            }),
                          }),
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
    }),
    conversions: array({
      minItems: 1,
      items: object({
        required: ['id', 'relatesTo', 'relatedItem', 'coefficients'],
        properties: {
          id: string(),
          relatesTo: string({ enum: ['requirement', 'metric'] }),
          relatedItem: string(),
          description: string(),
          rationale: string(),
          coefficients: array({
            minItems: 1,
            items: object({
              required: ['id', 'value', 'coefficient'],
              properties: {
                id: string(),
                coefficient: numeric({ type: 'number' }),
                value: mixed(['string', 'number', 'integer']),
              },
            }),
          }),
        },
      }),
    }),
  },
});
