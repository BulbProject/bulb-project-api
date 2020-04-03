import { Metric as OCDSMetric } from 'ts4ocds/extensions/metrics';
import { Observation } from './observation';

export interface Metric extends OCDSMetric {
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
