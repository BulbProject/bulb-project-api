import type { Value } from './value';
import type { Unit as OCDSUnit } from 'ts4ocds';

export interface Unit extends OCDSUnit {
  value: Value;
}
