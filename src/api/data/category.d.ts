import { Classification } from './classification';
import { Conversion } from './conversion';
import { Criterion } from './criteria';
import { Item } from './item';

export interface Category {
  classification: Classification;
  conversions: Conversion[];
  criteria: Criterion[];
  description: string;
  id: string;
  items: Item[];
  title: string;
}
