import { Option } from './option';

export interface OptionGroup {
  /**
   * An identifier for this group.
   */
  id: string | number;
  /**
   * Free-text description for this group.
   */
  description?: string;
  /**
   * Options available for this 'optionGroup'.
   */
  options: Option[];
  /**
   * The scheme element that the group applies.
   */
  relatesTo: string;
}
