import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DatabaseService } from '../database';

import { CategoriesListEntry } from './models';

@Injectable()
export class CategoriesListRepositoryService {
  public constructor(
    @InjectRepository(CategoriesListEntry)
    private categoriesList: Repository<CategoriesListEntry>,
    private database: DatabaseService
  ) {}

  public async findAll(): Promise<CategoriesListEntry[]> {
    return this.database.handleUndefinedValue(async () => {
      return this.categoriesList.find();
    }, `No categories were found`);
  }

  public async createOne([categoryId, version]: [string, string], publishedDate: string): Promise<void> {
    return this.database.handleDbError(async () => {
      await this.categoriesList.save({
        id: categoryId,
        version,
        date: publishedDate,
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
      });
    });
  }
}
