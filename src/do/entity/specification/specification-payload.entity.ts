import { Category } from '../../../shared/entity/category';
import type { Mode } from '../mode';
import { SelectedVariant } from '../selected-variant';

export class SpecificationPayload {
  public category: Category;

  public version: string;

  public selectedVariant: SelectedVariant;

  public egp: string;

  public mode: Mode;
}
