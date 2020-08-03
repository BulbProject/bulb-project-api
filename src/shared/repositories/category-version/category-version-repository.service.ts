import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { formatDate } from '../../utils';
import { CategoriesListRepositoryService } from '../categories-list';

import { DatabaseService } from '../../database';
import { VersionsPackageRepositoryService } from '../versions-package';

import type { ManageResponse } from '../../entity';
import { Category } from '../../entity';
import { CategoryVersion } from './models';

@Injectable()
export class CategoryVersionRepositoryService {
  public constructor(
    @InjectRepository(CategoryVersion)
    private categoriesVersions: MongoRepository<CategoryVersion>,
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

  public async createOne(categoryId: string, category: Category): Promise<ManageResponse> {
    const version = 'v1';
    const publishedDate = formatDate(new Date());

    await this.database.handleDbError(async () => {
      await Promise.all([
        this.categoriesVersions.save({
          version,
          category,
          date: publishedDate,
          createdAt: publishedDate,
          status: 'pending',
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
      const versionsPackage = await this.versionsPackage.getOne(categoryId);

      const [, previosVersion] = [
        ...(versionsPackage.versions[versionsPackage.versions.length - 1].match(/\/v(\d+)/) as RegExpMatchArray),
      ];

      const { _id, ...previousCategoryVersion } = await this.getOne([categoryId, `v${previosVersion}`]);

      const nextVersion = `v${Number(previosVersion) + 1}`;

      const updatedAt = formatDate(new Date());

      await Promise.all([
        this.categoriesVersions.save({
          ...previousCategoryVersion,
          version: nextVersion,
          date: updatedAt,
          updatedAt,
          category,
        }),
        this.versionsPackage.updateVersion([categoryId, nextVersion], updatedAt),
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
        updatedAt: formatDate(new Date()),
        status: 'active',
      });
    });

    return {
      id: categoryId,
      version,
    };
  }
}
