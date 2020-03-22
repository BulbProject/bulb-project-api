import { Option } from './option';

export interface OptionsToCombine {
  id: string | number;
  relatedOptions: Option[];
}
