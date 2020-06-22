import { Criterion } from '../parts';

export interface Specification {
  id: string;
  categoryId: string;
  version: string;
  criteria: Criterion[];
}
