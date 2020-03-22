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
  /**
   * Where relatesTo = "item" this field must be populated with the id of the item in this tender section
   * which the criterion relates to.
   * Where relatesTo <> "item" this field should be omitted.
   *
   * @ToDo: make this a discriminated union.
   */
  relatedItem?: string;
  /**
   * The schema element that the criterion judges, evaluates or assesses.
   * For example criterion may be defined against items or against bidders.
   */
  relatesTo?: 'item' | 'bidder';
}
