import { RequirementGroup } from './requirement-group';

export interface Criterion {
  /**
   * The identifier for this criterion.
   */
  id: string | number;
  /**
   * Criterion title.
   */
  title?: string;
  /**
   * Criterion description.
   */
  description?: string;
  /**
   * A list of requirementGroup for this Criterion.
   * A criterion is satisfied by one or more requirement groups being met.
   * A requirement group is met when all requirements in the group are satisfied.
   */
  requirementGroups: RequirementGroup[];
}
