export const classification = {
  type: 'object',
  required: ['id'],
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
