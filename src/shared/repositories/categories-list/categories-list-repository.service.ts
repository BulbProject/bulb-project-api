import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { DatabaseService } from '../../database';

import { CategoriesListEntry } from './models';

@Injectable()
export class CategoriesListRepositoryService {
  public constructor(
    @InjectRepository(CategoriesListEntry)
    private categoriesList: MongoRepository<CategoriesListEntry>,
    private database: DatabaseService
  ) {}

  public async findAll(): Promise<CategoriesListEntry[]> {
    return this.database.handleUndefinedValue(async () => {
      const allCategories = (await this.categoriesList.find()).sort(({ version: versionA }, { version: versionB }) =>
        versionB.localeCompare(versionA, undefined, {
          numeric: true,
          sensitivity: 'base',
        })
      );

      return [...new Set(allCategories.map(({ id }) => id))].map(
        (id) => allCategories.find((category) => category.id === id) as CategoriesListEntry
      );
    }, `No categories were found`);
  }

  public async createOne([categoryId, version]: [string, string], publishedDate: string): Promise<void> {
    return this.database.handleDbError(async () => {
      await this.categoriesList.save({
        id: categoryId,
        version,
        date: publishedDate,
        createdAt: publishedDate,
      });
    });
  }

  public async updateVersion([categoryId, version]: [string, string], updatedAt: string): Promise<void> {
    const category = await this.database.handleUndefinedValue(async () => {
      return this.categoriesList.findOne({
        id: categoryId,
      });
    }, `Could not find a record for category with id ${categoryId}.`);

    return this.database.handleDbError(async () => {
      await this.categoriesList.save({
        id: category.id,
        version,
        date: updatedAt,
        updatedAt,
      });
    });
  }
}
