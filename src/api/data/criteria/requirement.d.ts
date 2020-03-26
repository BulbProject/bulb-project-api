import { DataType } from '../../shared';
import { OptionDetails } from '../options';
import { Period } from '../period';

export type Requirement = RequirementNumber | RequirementString | RequirementBoolean;

interface RequirementBase {
  /**
   * The identifier for this requirement.
   */
  id: string;
  /**
   * Requirement title.
   */
  title?: string;
  /**
   * Requirement description.
   */
  description?: string;
  dataType: DataType;
  /**
   * Used to state the requirement when the response must be particular value.
   */
  expectedValue?: string | number | boolean;
  /**
   * Used to state the lower bound of the requirement when the response must be within a certain range.
   */
  minValue?: number;
  /**
   * Used to state the upper bound of the requirement when the response must be within a certain range
   */
  maxValue?: number;
  /**
   * Where options are applied 'Option Details' is used to capture this information.
   */
  optionDetails?: OptionDetails;
  /**
   * Used to specify a particular period the requirement applies to, for example the bidder's turnover in a given year.
   */
  period?: Period;
}

interface RequirementNumber extends RequirementBase {
  dataType: 'number' | 'integer';
  expectedValue?: number;
  minValue?: number;
  maxValue?: number;
}

interface RequirementString extends RequirementBase {
  dataType: 'string';
  expectedValue?: string;
  minValue?: never;
  maxValue?: never;
}

interface RequirementBoolean extends RequirementBase {
  dataType: 'boolean';
  expectedValue?: boolean;
  minValue?: never;
  maxValue?: never;
}
