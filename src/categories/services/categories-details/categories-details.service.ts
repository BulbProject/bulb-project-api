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

    return Promise.all(
      categoriesListEntries.map(async ({ version, id }) => {
        const { date, status, category } = await this.categoriesVersions.getOne([id, version]);

        return {
          id,
          version,
          date,
          status,
          title: category.title,
          description: category.description,
          image: category.documents.find((document) => !document.relatesTo)?.url as string,
        };
      })
    );
  }
}
