import { object, string } from '../primitives';

export const classification = object({
  required: ['scheme', 'id'],
  properties: {
    scheme: string(),
    id: string(),
    description: string(),
    uri: string(),
  },
});
