import { RequirementResponse } from './requirement';

export interface RequestedNeed {
  id: string;
  requirementResponses: RequirementResponse[];
}
