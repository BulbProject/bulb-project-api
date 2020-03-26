import { OptionGroup } from './option-group';
import { OptionsToCombine } from './options-to-combine';

export interface OptionDetails {
  /**
   * A list of option groups for this element.
   */
  optionGroups: OptionGroup[];
  /**
   * Where buyer reserves the right to combine options a 'Option to combine' is used to capture this information.
   */
  optionsToCombine?: OptionsToCombine[];
}
