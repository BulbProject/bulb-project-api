import { Period } from '../../data/period';
import { RequirementReference } from '../requirement/requirement-reference';
import { Unit } from './unit';
import { Value } from './value';

export interface Observation {
  id: string;
  dimensions: Record<string, string>;
  notes?: string;
  period?: Period;
  relatedRequirementID: RequirementReference;
  unit: Unit;
  value?: Value;
  measure?: string | number;
}
