import { Value } from './value';

export interface Unit {
  /**
   * The identifier from the codelist referenced in the scheme property.
   * For example, with UNCEFACT, this is the value of the 'Common Code' column.
   * From this identifier, applications can look-up the human readable name or symbol for this unit of measure.
   */
  id?: string;
  /**
   * Name of the unit.
   */
  name?: string;
  /**
   * The list from which units of measure identifiers are taken.
   * Use of the scheme 'UNCEFACT' for the UN/CEFACT Recommendation 20 list of
   * 'Codes for Units of Measure Used in International Trade' is recommended.
   */
  scheme?: string;
  /**
   * If the scheme used provide a machine-readable URI for this unit of measure, this can be given.
   */
  uri?: string;
  /**
   * The monetary Value of a single unit.
   */
  value: Value;
}
