import { classification } from './classification';
import { options } from './options';
import { period } from './period';

export const category = {
  type: 'object',
  required: ['id', 'title', 'description', 'classification', 'items', 'criteria', 'conversions'],
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
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['id', 'description', 'classification'],
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
    criteria: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['id', 'title', 'requirementGroups'],
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
                    required: ['id', 'title', 'dataType'],
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
                        enum: ['boolean', 'string', 'number', 'integer'],
                      },
                      expectedValue: {
                        type: ['boolean', 'string', 'number', 'integer'],
                      },
                      minValue: {
                        type: ['number', 'integer'],
                      },
                      maxValue: {
                        type: ['number', 'integer'],
                      },
                      period,
                      optionDetails: {
                        type: 'object',
                        required: ['optionGroups'],
                        properties: {
                          optionGroups: {
                            type: 'array',
                            minItems: 1,
                            items: {
                              type: 'object',
                              required: ['id', 'relatesTo', 'options'],
                              properties: {
                                id: {
                                  type: 'string',
                                },
                                description: {
                                  type: 'string',
                                },
                                relatesTo: {
                                  type: 'string',
                                  enum: ['value'],
                                },
                                options,
                              },
                            },
                          },
                          optionsToCombine: {
                            type: 'array',
                            minItems: 1,
                            items: {
                              type: 'object',
                              required: ['id', 'relatedOptions'],
                              properties: {
                                id: {
                                  type: 'string',
                                },
                                relatedOptions: {
                                  type: 'array',
                                  minItems: 1,
                                  items: {
                                    type: 'string',
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
              },
            },
          },
        },
      },
    },
    conversions: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['id', 'relatesTo', 'relatedItem', 'coefficients'],
        properties: {
          id: {
            type: 'string',
          },
          relatesTo: {
            type: 'string',
            enum: ['requirement', 'metric'],
          },
          relatedItem: {
            type: 'string',
          },
          description: {
            type: 'string',
          },
          rationale: {
            type: 'string',
          },
          coefficients: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['id', 'value', 'coefficient'],
              properties: {
                id: {
                  type: 'string',
                },
                coefficient: {
                  type: 'number',
                },
                value: {
                  type: ['string', 'number', 'integer'],
                },
              },
            },
          },
        },
      },
    },
  },
};
