import { Period } from '../../data';
import { RequirementReference } from '../requirement';
import { Unit } from './unit';
import { Value } from './value';

export interface Observation {
  /**
   * A local identifier for this specific observation.
   * This may be an arbitrary identifier, or could be a composite of the metric identifier,
   * and the date and other dimensions of this observation.
   */
  id: string;
  /**
   * Any number of dimensions can be recorded within this object.
   * Dimensions names should follow the camelCase conventions of OCDS.
   */
  dimensions: Record<string, string>;
  /**
   * Any notes on this observation. This may include clarifying information.
   */
  notes?: string;
  /**
   * The Period over which this observation is measured.
   */
  period?: Period;
  /**
   * The RequirementReference of the requirement which the observation is applicable to.
   */
  relatedRequirementID: RequirementReference;
  unit: Unit;
  /**
   * For financial metrics, the Value of this forecast, target or actual observation.
   */
  value?: Value;
  /**
   * For non-financial metrics, the measure of this forecast, target or actual observation.
   * Measures may be provided as free text or numerical values.
   */
  measure?: string | number;
}
