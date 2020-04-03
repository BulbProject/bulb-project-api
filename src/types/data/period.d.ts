import { Period as OCDSPeriod } from 'ts4ocds';

export interface Period extends OCDSPeriod {
  duration: string;
}
