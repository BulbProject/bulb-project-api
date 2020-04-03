import { Value } from './value';
import { Unit as OCDSUnit } from 'ts4ocds';

export interface Unit extends OCDSUnit {
  value: Value;
}
