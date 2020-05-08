import type { Metric as OCDSMetric, Observation } from 'ts4ocds/extensions/metrics';

export interface Metric extends OCDSMetric {
  observations: Observation[];
  /**
   * The schema element that the metric relates.
   */
  relatesTo?: 'item';
  /**
   * This field must be populated with the id of the item in this tender section which the metric relates to.
   */
  relatedItem?: string;
}
