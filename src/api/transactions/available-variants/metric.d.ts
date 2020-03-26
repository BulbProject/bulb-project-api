import { Observation } from './observation';

export interface Metric {
  /**
   * An identifier for this metric.
   * In some cases this may be drawn from a codelist of metrics required for this type of contracting process,
   * or in other instances may be an arbitrary identifier.
   */
  id: string;
  /**
   * The title of this metric.
   */
  title?: string;
  /**
   * A short description of the metric.
   * This may include short details of measurement methods.
   */
  description?: string;
  /**
   * An array of Observation: target or actual values for this metric.
   */
  observations: Observation[];
  /**
   * The schema element that the metric relates.
   * For example observation may be defined against items or against lot.
   */
  relatesTo?: 'item' | 'lot';
  /**
   * This field must be populated with the id of the item in this tender section which the metric relates to.
   */
  relatedItem?: string;
}
