import { Requirement } from './requirement';

export interface RequirementGroup {
  id: string;
  description?: string;
  requirements: Requirement[];
}
