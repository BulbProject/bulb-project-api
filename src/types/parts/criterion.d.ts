import { Unit } from 'ts4ocds';
import type {
  Criterion as OCDSCriterion,
  RequirementGroup as OCDSRequirementGroup,
  Requirement as OCDSRequirement,
} from 'ts4ocds/extensions/requirements';

export type Requirement = OCDSRequirement & { unit?: Unit };

export type RequirementGroup = OCDSRequirementGroup<Requirement>;

export type Criterion = OCDSCriterion<RequirementGroup>;
