import { Coefficient } from './coefficient';

export interface Conversion {
  /**
   * An identifier for this conversion.
   */
  id: string | number;
  /**
   * Free text description of this conversion could be shared here.
   */
  description: string;
  /**
   * A list of any applicable coefficient for this conversion.
   */
  coefficients: Coefficient[];
  /**
   * The free-text rationale of using of this conversion.
   */
  rationale: string;
  /**
   * Where 'relatesTo' is not empty this field must be populated with the id of the item in this tender section
   * which the conversion relates to.
   */
  relatedItem?: string;
  /**
   * The schema element that the conversion applies. For example, the conversion may be defined
   * against a requirement or against a metric.
   */
  relatesTo?: 'requirement' | 'metric';
}
