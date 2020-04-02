export const classification = {
  type: 'object',
  required: ['scheme', 'id'],
  properties: {
    scheme: {
      type: 'string',
    },
    id: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    uri: {
      type: 'string',
    },
  },
};
