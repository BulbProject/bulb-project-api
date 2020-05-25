import { Category } from 'types/data/category';
import type { SelectedVariant } from 'types/transactions/selected-variant';

export type Mode = 'json' | 'docx';

export type SpecificationEngine = ({
  category,
  version,
  selectedVariant,
  egp,
  mode,
}: {
  category: Category;
  version: string;
  selectedVariant: SelectedVariant;
  egp: string;
  mode: Mode;
}) => Promise<{ id: string } | Buffer>;
