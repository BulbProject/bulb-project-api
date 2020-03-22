import { Period } from './period';

export interface Coefficient {
  coefficient?: number;
  id: number | string;
  maxValue?: number;
  minValue?: number;
  period: Period;
  value?: number;
}
