import { Category } from '../../../shared/entity/category';
import { RequestedNeed } from '../requested-need';

export interface CalculationPayload {
  category: Category;
  version: string;
  requestedNeed: RequestedNeed;
}
