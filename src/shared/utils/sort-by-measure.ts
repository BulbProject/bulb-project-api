import { AvailableVariant } from '../../do/entity/available-variant';

export const sortAvailableVariantsByMeasure = (availableVariants: AvailableVariant[] = []) => {
  return [...availableVariants].sort(
    (variant1, variant2) =>
      (variant2.metrics[0].observations[0]?.measure as number) -
      (variant1.metrics[0].observations[0]?.measure as number)
  );
};
