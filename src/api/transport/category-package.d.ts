import { CategoryVersion } from './category-version';

export interface CategoryPackage<Publisher extends {}> {
  license?: string;
  publicationPolicy?: string;
  publishedDate: string;
  publisher: Publisher;
  uri: string;
  version: string;
  versions: CategoryVersion[];
}
