import { numeric, object, string } from '../primitives';

export const value = object({
  required: ['amount', 'currency'],
  properties: {
    amount: numeric(),
    currency: string(),
  },
});
