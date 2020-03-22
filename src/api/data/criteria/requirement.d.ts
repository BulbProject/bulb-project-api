import { DataType } from '../../shared';
import { OptionDetails } from '../options';
import { Period } from '../period';

export interface Requirement {
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
  dataType?: DataType;
  /**
   * Used to state the requirement when the response must be particular value.
   *
   * @ToDo: make a discriminated union.
   */
  expectedValue?: string | number;
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
