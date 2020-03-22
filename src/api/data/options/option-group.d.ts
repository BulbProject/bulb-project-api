import { Option } from './option';

export interface OptionGroup {
  id: string | number;
  description: string;
  options: Option[];
  relatesTo: string;
}
