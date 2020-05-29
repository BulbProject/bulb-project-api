import type { Category } from 'types/data/category';
import type { AvailableVariants, RequestedNeed } from 'types/transactions';

export type CalculationEngine = ({
  category,
  version,
  requestedNeed,
}: {
  category: Category;
  version: string;
  requestedNeed: RequestedNeed['requestedNeed'];
}) => AvailableVariants;
