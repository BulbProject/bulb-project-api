import type { RequirementResponse } from './requirement-response';

/**
 * General transaction for request a specific need by CA.
 */
export interface RequestedNeed {
  /**
   * A unique identifier for this need captured.
   */
  id: string;
  /**
   * Set of requirementResponses by CA against requirements of the category.
   */
  requirementResponses: RequirementResponse[];
}
