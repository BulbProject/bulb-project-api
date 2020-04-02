export const period = {
  type: 'object',
  required: ['duration'],
  properties: {
    duration: {
      type: 'string',
    },
    durationInDays: {
      type: 'number',
    },
    startDate: {
      type: 'string',
    },
    endDate: {
      type: 'string',
    },
    maxExtentDate: {
      type: 'string',
    },
  },
};
