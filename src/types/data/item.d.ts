import { Classification } from './classification';

export interface Item {
  /**
   * A local identifier to reference and merge the items by.
   * Must be unique within a given array of items.
   */
  id: string | number;
  /**
   * A description of this specific type of good.
   */
  description?: string;
  /**
   * The primary classification for the item.
   */
  classification: Classification;
  /**
   * An array of additional classification for the item.
   * This may also be used to present codes from an internal classification scheme.
   */
  additionalClassifications?: Classification[];
}
