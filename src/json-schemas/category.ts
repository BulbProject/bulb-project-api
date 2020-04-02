import { classification } from './classification';
import { options } from './options';
import { period } from './period';

export const category = {
  type: 'object',
  required: ['id', 'title', 'description', 'classification', 'conversions', 'criteria', 'items'],
  properties: {
    id: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    classification,
    conversions: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['id', 'coefficients'],
        properties: {
          id: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          coefficients: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['id'],
              properties: {
                id: {
                  type: 'string',
                },
                coefficient: {
                  type: 'number',
                },
                value: {
                  type: 'number',
                },
                minValue: {
                  type: 'number',
                },
                maxValue: {
                  type: 'number',
                },
                period,
              },
            },
          },
          rationale: {
            type: 'string',
          },
          relatesTo: {
            type: 'string',
            enum: ['requirement', 'metric'],
          },
          relatedItem: {
            type: 'string',
          },
        },
      },
    },
    criteria: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['id', 'requirementGroups'],
        properties: {
          id: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          requirementGroups: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['id', 'requirements'],
              properties: {
                id: {
                  type: 'string',
                },
                description: {
                  type: 'string',
                },
                requirements: {
                  type: 'array',
                  minItems: 1,
                  items: {
                    type: 'object',
                    required: ['id', 'dataType'],
                    properties: {
                      id: {
                        type: 'string',
                      },
                      title: {
                        type: 'string',
                      },
                      description: {
                        type: 'string',
                      },
                      dataType: {
                        type: 'string',
                        enum: ['string', 'number', 'integer', 'boolean'],
                      },
                      expectedValue: {
                        type: ['string', 'number', 'boolean'],
                      },
                      minValue: {
                        type: 'number',
                      },
                      maxValue: {
                        type: 'number',
                      },
                      optionDetails: {
                        type: 'object',
                        required: ['optionGroups'],
                        properties: {
                          optionGroups: {
                            type: 'array',
                            minItems: 1,
                            items: {
                              type: 'object',
                              required: ['id', 'options', 'relatesTo'],
                              properties: {
                                id: {
                                  type: 'string',
                                },
                                description: {
                                  type: 'string',
                                },
                                options,
                              },
                              relatesTo: {
                                type: 'string',
                              },
                            },
                          },
                          optionsToCombine: {
                            type: 'array',
                            minItems: 1,
                            required: ['id', 'relatedOptions'],
                            items: {
                              type: 'object',
                              required: ['id', 'relatedOptions'],
                              properties: {
                                id: {
                                  type: 'string',
                                },
                                relatedOptions: options,
                              },
                            },
                          },
                        },
                      },
                      period,
                    },
                    dependencies: {
                      dataType: {
                        oneOf: [
                          {
                            properties: {
                              dataType: {
                                const: 'string',
                              },
                              expectedValue: {
                                type: 'string',
                              },
                            },
                          },
                          {
                            properties: {
                              dataType: {
                                const: 'boolean',
                              },
                              expectedValue: {
                                type: 'boolean',
                              },
                            },
                          },
                          {
                            properties: {
                              dataType: {
                                const: 'number',
                              },
                              expectedValue: {
                                type: 'number',
                              },
                              minValue: {
                                type: 'number',
                              },
                              maxValue: {
                                type: 'number',
                              },
                            },
                          },
                          {
                            properties: {
                              dataType: {
                                const: 'integer',
                              },
                              expectedValue: {
                                type: 'integer',
                              },
                              minValue: {
                                type: 'integer',
                              },
                              maxValue: {
                                type: 'integer',
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['id', 'classification'],
        properties: {
          id: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          classification,
          additionalClassifications: {
            type: 'array',
            minItems: 1,
            items: classification,
          },
        },
      },
    },
  },
};
