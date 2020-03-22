import { DataType } from '../../shared';
import { OptionDetails } from '../options';
import { Period } from '../period';

export interface Requirement {
  id: string;
  title?: string;
  description?: string;
  dataType?: DataType;
  expectedValue?: string | number;
  minValue?: number;
  maxValue?: number;
  optionDetails?: OptionDetails;
  period?: Period;
}
