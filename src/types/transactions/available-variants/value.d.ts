export interface Value {
  /**
   * Amount as a number.
   */
  amount?: number;
  /**
   * The currency for each amount should always be specified using the uppercase 3-letter currency code from ISO4217.
   */
  currency?: string;
  valueAddedTaxIncluded: boolean;
}
