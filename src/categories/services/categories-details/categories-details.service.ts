import { Injectable } from '@nestjs/common';

import { CategoriesListRepositoryService } from '../../../shared/repositories/categories-list';
import { CategoryVersionRepositoryService } from '../../../shared/repositories/category-version';
import { CategoryDetails } from '../../entity';

@Injectable()
export class CategoriesDetailsService {
  public constructor(
    private categoriesList: CategoriesListRepositoryService,
    private categoriesVersions: CategoryVersionRepositoryService
  ) {}

  public async getCategoriesDetails(): Promise<CategoryDetails[]> {
    const categoriesListEntries = await this.categoriesList.findAll();

    if (categoriesListEntries.length === 0) {
      return [];
    }

    const categoriesVersions = await this.categoriesVersions.getMany(
      categoriesListEntries.map(({ id, version }) => ({ categoryId: id, version }))
    );

    return categoriesVersions.map(({ version, date, status, category: { id, title, description, documents } }) => ({
      id,
      version,
      status,
      date,
      title,
      description,
      image: documents.find(({ relatesTo, relatedItem }) => !relatesTo && !relatedItem)?.url as string,
    }));
  }
}
