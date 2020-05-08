import type { Value as OCDSValue } from 'ts4ocds';

export interface Value extends OCDSValue {
  valueAddedTaxIncluded: boolean;
}
