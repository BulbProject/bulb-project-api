import { Period } from '../../data';
import { RequirementReference } from './requirement-reference';
import { OrganizationReference } from './organization-reference';

export type RequirementResponse = RequirementResponseItem | RequirementResponseTenderer;

interface RequirementResponseBase {
  /**
   * The identifier for this requirement response.
   */
  id: string;
  /**
   * Requirement response title.
   */
  title?: string;
  /**
   * Requirement response description.
   */
  description?: string;
  /**
   * The RequirementReference of the requirement which the response is applicable to.
   */
  requirement: RequirementReference;
  /**
   * Requirement response value.
   * The value must be of the type defined in the requirement.dataType field.
   */
  value?: string | number;
  /**
   * The Period which the requirement response is applicable to.
   */
  period?: Period;
  /**
   * Where this requirement response relates to an item and is provided by the buyer or procuring entity
   * this field should be used to reference the id in the items' section for the item the response relates to.
   */
  relatedItem?: string;
  /**
   * Where this requirement response relates to a tenderer and is provided by the buyer or procuring entity
   * this field should be used as OrganizationReference the entry in the parties section
   * for the tenderer the response relates to.
   */
  relatedTenderer?: OrganizationReference;
}

interface RequirementResponseItem extends RequirementResponseBase {
  relatedItem?: string;
  relatedTenderer?: never;
}

interface RequirementResponseTenderer extends RequirementResponseBase {
  relatedItem?: never;
  relatedTenderer?: OrganizationReference;
}
