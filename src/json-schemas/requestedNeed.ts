import { requirementResponses } from './parts';

import { object, string } from './primitives';

export const requestedNeed = object({
  required: ['requestedNeed'],
  properties: {
    requestedNeed: object({
      required: ['id', 'requirementResponses'],
      properties: {
        id: string(),
        requirementResponses,
      },
    }),
  },
});
