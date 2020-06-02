import type { Category } from 'types/data/category';
import type { RequestedNeed } from 'types/transactions';
import type { AvailableVariantsResponse } from 'types/transport';

export type CalculationEngine = ({
  category,
  version,
  requestedNeed,
}: {
  category: Category;
  version: string;
  requestedNeed: RequestedNeed;
}) => AvailableVariantsResponse;
