import { string, numeric, object } from './primitives';

export const period = object({
  properties: {
    startDate: string(),
    endDate: string(),
    maxExtentDate: string(),
    duration: string(),
    durationInDays: numeric({ type: 'number' }),
  },
});
