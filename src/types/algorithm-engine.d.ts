import type { Category } from './data/category';
import type { AvailableVariants, RequestedNeed } from './transactions';

export type AlgorithmEngine = ({
  category,
  requestedNeed,
}: {
  category: Category;
  version: string;
  requestedNeed: RequestedNeed;
}) => AvailableVariants;
