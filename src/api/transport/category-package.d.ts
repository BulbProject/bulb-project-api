import { CategoryVersion } from './category-version';

/**
 * The version package contains a list of versions along with some publishing metadata.  A 'package' of a version
 * follows the same structure as a version, but combines information from multiple points in time into a single summary.
 */
export interface CategoryPackage<Publisher = {}> {
  /**
   * A link to the license that applies to the data in this package. A Public Domain Dedication
   * or [Open Definition Conformant](http://opendefinition.org/licenses/) license is recommended. The canonical URI
   * of the license should be used. Documents linked from this file may be under other license conditions.
   */
  license?: string;
  /**
   * A link to a document describing the publishers
   * [publication policy](https://standard.open-contracting.org/1.1/en/implementation/publication_policy/).
   */
  publicationPolicy?: string;
  /**
   * The date that this package was published. If this package is generated 'on demand', this date should reflect
   * the date of the last change to the underlying contents of the package.
   */
  publishedDate: string;
  /**
   * Information to uniquely identify the publisher of this package.
   */
  publisher: Publisher;
  /**
   * The URI of this package that identifies it uniquely in the world. Recommended practice is to use
   * a dereferenceable URI, where a persistent copy of this package is available.
   */
  uri: string;
  /**
   * The version of the OCDS schema used in this package, expressed as major.minor For example: 1.0 or 1.1
   */
  version: string;
  /**
   * An array of one or more versions
   */
  versions: CategoryVersion[];
}
