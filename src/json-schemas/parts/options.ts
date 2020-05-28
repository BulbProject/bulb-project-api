import { string, mixed, object, array } from '../primitives';

export const options = array({
  minItems: 1,
  items: object({
    required: ['id', 'description', 'value'],
    properties: {
      id: string(),
      description: string(),
      value: mixed(['string', 'number']),
    },
  }),
});
