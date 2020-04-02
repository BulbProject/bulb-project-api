export const classification = {
  type: 'object',
  required: ['id', 'scheme'],
  properties: {
    id: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    scheme: {
      type: 'string',
    },
    uri: {
      type: 'string',
    },
  },
};
