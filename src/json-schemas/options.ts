export const options = {
  type: 'array',
  minItems: 1,
  items: {
    type: 'object',
    required: ['id', 'description', 'value'],
    properties: {
      id: {
        type: 'string',
      },
      description: {
        type: 'string',
      },
      value: {
        type: ['string', 'number'],
      },
    },
  },
};
