import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { formatDate } from '../../utils';
import { CategoriesListRepositoryService } from '../categories-list-repository';

import { DatabaseService } from '../database';
import { VersionsPackageRepositoryService } from '../versions-package-repository';

import type { ManageResponse } from '../../entity';
import { Category } from '../../entity';
import { CategoryVersion } from './models';

@Injectable()
export class CategoryVersionRepositoryService {
  public constructor(
    @InjectRepository(CategoryVersion)
    private categoriesVersions: Repository<CategoryVersion>,
    private versionsPackage: VersionsPackageRepositoryService,
    private categoriesList: CategoriesListRepositoryService,
    private database: DatabaseService
  ) {}

  public async getOne([categoryId, version]: [string, string]): Promise<CategoryVersion> {
    return this.database.handleUndefinedValue(() => {
      return this.categoriesVersions.findOne({
        where: {
          version,
          'category.id': categoryId,
        },
      });
    }, `Category ${categoryId} with version ${version} was not found`);
  }

  public async getAllById(categoryId: string): Promise<CategoryVersion[]> {
    return this.database.handleUndefinedValue(() => {
      return this.categoriesVersions.find({
        where: {
          'category.id': categoryId,
        },
      });
    }, `No records present for id ${categoryId}`);
  }

  public async createOne(categoryId: string, category: Category): Promise<ManageResponse> {
    const version = 'v1';
    const publishedDate = formatDate(new Date());

    await this.database.handleDbError(async () => {
      await Promise.all([
        this.categoriesVersions.save({
          version,
          category,
          date: publishedDate,
        }),
        this.versionsPackage.createOne([categoryId, version], publishedDate),
        this.categoriesList.createOne([categoryId, version], publishedDate),
      ]);
    });

    return {
      id: category.id,
      version,
    };
  }

  public async updateVersion(categoryId: string, category: Category): Promise<ManageResponse> {
    return this.database.handleUndefinedValue(async () => {
      const categories = await this.getAllById(categoryId);

      const nextVersion = `v${
        categories
          .sort(({ version: versionA }, { version: versionB }) => versionA.localeCompare(versionB))[0]
          .version.slice(1) + 1
      }`;
      const updatedAt = formatDate(new Date());

      await Promise.all([
        this.categoriesVersions.save({
          version: nextVersion,
          date: updatedAt,
          category,
        }),
        this.versionsPackage.updateVersion([categoryId, nextVersion]),
        this.categoriesList.updateVersion([categoryId, nextVersion], updatedAt),
      ]);

      return {
        id: categoryId,
        version: nextVersion,
      };
    }, `Could not update version for category with id ${categoryId}`);
  }

  public async updateStatus([categoryId, version]: [string, string]): Promise<ManageResponse> {
    const category = await this.getOne([categoryId, version]);

    if (category.status === 'active') {
      throw new BadRequestException(`Category ${categoryId} had already been activated.`);
    }

    await this.database.handleDbError(async () => {
      await this.categoriesVersions.save({
        ...category,
        status: 'active',
      });
    });

    return {
      id: categoryId,
      version,
    };
  }
}
