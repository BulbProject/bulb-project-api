import { Injectable } from '@nestjs/common';

import { CategoriesListRepositoryService } from '../../../shared/modules/categories-list-repository';
import { CategoryVersionRepositoryService } from '../../../shared/modules/category-version-repository';
import { CategoryDetails } from '../../entity';

@Injectable()
export class CategoriesDetailsService {
  public constructor(
    private categoriesList: CategoriesListRepositoryService,
    private categoriesVersions: CategoryVersionRepositoryService
  ) {}

  public async getCategoriesDetails(): Promise<CategoryDetails[]> {
    const categoriesListEntries = await this.categoriesList.findAll();

    return Promise.all(
      categoriesListEntries.map(({ version, id }) => {
        return this.categoriesVersions.getOne([id, version]);
      })
    ).then((categoryVersions) => {
      return categoryVersions.map(({ date, category, status, version }) => ({
        id: category.id,
        version,
        date,
        status,
        title: category.title,
        description: category.description,
        image: category.documents?.find((document) => !document.relatesTo)?.url,
      }));
    });
  }
}
