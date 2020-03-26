import { Requirement } from './requirement';

export interface RequirementGroup {
  /**
   * The identifier for this requirement group.
   */
  id: string;
  /**
   * Requirement group description.
   */
  description?: string;
  /**
   * A list of any requirement which must all be satisfied for the requirement group to be met.
   */
  requirements: Requirement[];
}
