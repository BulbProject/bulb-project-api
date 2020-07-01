import { Category } from '../../../shared/entity/category';
import type { Mode } from '../mode';
import { SelectedVariant } from '../selected-variant';

export interface SpecificationPayload {
  category: Category;
  version: string;
  selectedVariant: SelectedVariant;
  egp: string;
  mode: Mode;
}
