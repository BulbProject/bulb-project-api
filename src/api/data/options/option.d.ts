export interface Option {
  id: string | number;
  /**
   * Free-text description for this option.
   */
  description: string;
  /**
   * Value provided by this option.
   */
  value: string | number;
}
