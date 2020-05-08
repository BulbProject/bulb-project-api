import type { Classification, Unit, Document } from 'ts4ocds';
import type { Conversion } from 'ts4ocds/extensions/conversions';
import type { Criterion, RequirementGroup, Requirement } from 'ts4ocds/extensions/requirements';
import type { Item } from './item';

export interface Category {
  /**
   * ID for this category specified as a code of a relevant CPV class common for all the items under this category.
   */
  id: string;
  /**
   * General title for this category
   */
  title: string;
  /**
   * General description for this category.
   */
  description: string;
  /**
   * Common classification for this category taken from CPV.
   */
  classification: Classification;
  /**
   * List of the types of goods available under this category.
   */
  items: Item[];
  documents?: (Document & { relatesTo: 'item'; relatedItem: string })[];
  /**
   * Criteria describe the sequence of related questions, where answers are needed to reflect the specific needs
   * that the Procuring Entity intends to purchase.
   * Array according to [ocds_requirements_extension](https://github.com/open-contracting-extensions/ocds_requirements_extension)
   */
  criteria: Criterion<RequirementGroup<Requirement & { unit: Unit }>>[];
  /**
   * Conversions needed to run a calculation of available valiants once Procuring Entities' need is captured.
   * Array according to [eOCDS-conversions](https://github.com/eOCDS-Extensions/eOCDS-conversions).
   */
  conversions: Conversion[];
}