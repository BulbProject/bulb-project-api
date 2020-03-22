import { Observation } from './observation';

export interface Metric {
  id: string;
  title?: string;
  description?: string;
  observations: Observation[];
  relatesTo?: 'item' | 'lot';
  relatedItem?: string;
}
