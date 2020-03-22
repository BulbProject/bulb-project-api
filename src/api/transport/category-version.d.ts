import { Category } from '../data';

/**
 * Each version provides data about an actual version of the category at a particular point in time.
 * Version can be used to notify users about any changes or updates. One category may have many versions.
 */
export interface CategoryVersion {
  /**
   * A specific category of goods presented by its particular version.
   */
  category: Category;
  /**
   * The date this version was released, or published.
   */
  date: string;
  /**
   * An identifier for this particular version of information
   */
  id: string;
}
