import { RequirementGroup } from './requirement-group';

export interface Criterion {
  title?: string;
  description?: string;
  id: string | number;
  relatedItem?: string;
  relatesTo?: string;
  requirementGroups: RequirementGroup[];
}
