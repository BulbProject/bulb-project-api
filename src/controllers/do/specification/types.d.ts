import { Category } from 'types/data/category';
import type { SelectedVariant } from 'types/transactions/selected-variant';
import type { Criterion } from 'types/parts';

export type Mode = 'json' | 'rtf';

export type SpecificationEngine = ({
  category,
  selectedVariant,
  egp,
  mode,
}: {
  category: Category;
  selectedVariant: SelectedVariant;
  egp: string;
  mode: Mode;
}) => Criterion[] | string;
