import type { SelectedVariant } from 'types/transactions/selected-variant';
import type { Criterion } from 'types/parts';

export type Mode = 'json' | 'rtf';

export type SpecificationEngine = ({
  selectedVariant,
  egp,
  mode,
}: {
  selectedVariant: SelectedVariant;
  egp: string;
  mode: Mode;
}) => Criterion[] | string;
