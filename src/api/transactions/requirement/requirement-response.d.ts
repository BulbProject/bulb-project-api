import { Period } from '../../data/period';
import { OrganizationReference } from './organization-reference';
import { RequirementReference } from './requirement-reference';

export interface RequirementResponse {
  id: string;
  title?: string;
  description?: string;
  value?: string | number;
  period?: Period;
  relatedItem?: string;
  relatedTenderer?: OrganizationReference;
  requirement: RequirementReference;
}
