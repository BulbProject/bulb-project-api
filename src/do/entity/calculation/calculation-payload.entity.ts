import { Category } from '../../../shared/entity/category';
import { RequestedNeed } from '../requested-need';

export class CalculationPayload {
  public category: Category;

  public version: string;

  public requestedNeed: RequestedNeed;
}
