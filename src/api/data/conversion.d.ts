import { Coefficient } from './coefficient';

export interface Conversion {
  coefficients: Coefficient[];
  description: string;
  id: number | string;
  rationale: string;
  relatedItem?: string;
  relatesTo?: string;
}
