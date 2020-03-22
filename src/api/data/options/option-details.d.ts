import { OptionGroup } from './option-group';
import { OptionsToCombine } from './options-to-combine';

export interface OptionDetails {
  optionGroups: OptionGroup[];
  optionsToCombine: OptionsToCombine[];
}
