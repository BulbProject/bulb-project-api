import { Classification } from './classification';

export interface Item {
  id: string | number;
  description?: string;
  classification: Classification;
  additionalClassifications: Classification[];
}
