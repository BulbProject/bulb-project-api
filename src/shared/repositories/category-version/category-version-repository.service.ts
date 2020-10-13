import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { formatDate, getLastVersionNumber } from '../../utils';
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

  public async getOne(categoryId: string, version: string): Promise<CategoryVersion> {
    return this.database.handleUndefinedValue(() => {
      return this.categoriesVersions.findOne({
        where: {
          _id: this.generateInternalId(categoryId, version),
        },
      });
    }, `Category ${categoryId} with version ${version} was not found`);
  }

  public async getMany(query: { categoryId: string; version: string }[]): Promise<CategoryVersion[]> {
    return this.database.handleUndefinedValue(async () => {
      return this.categoriesVersions.find({
        where: {
          $or: query.map(({ categoryId, version }) => ({
            _id: this.generateInternalId(categoryId, version),
          })),
        },
        order: {
          date: 'DESC',
        },
      });
    }, '');
  }

  public async createOne(categoryId: string, category: Category): Promise<ManageResponse> {
    const existingCategoriesVersions = await this.database.handleDbError(() => {
      return this.categoriesVersions.find({
        id: categoryId,
      });
    });

    if (existingCategoriesVersions.length !== 0) {
      throw new BadRequestException(`Category ${categoryId} has already been created.`);
    }

    const version = 'v1';
    const publishedDate = formatDate(new Date());

    await this.database.handleDbError(async () => {
      await Promise.all([
        this.categoriesVersions.save({
          _id: this.generateInternalId(categoryId, version),
          id: categoryId,
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
      status: 'pending',
    };
  }

  public async updateVersion(categoryId: string, category: Category): Promise<ManageResponse> {
    return this.database.handleUndefinedValue(async () => {
      const versionsPackage = await this.versionsPackage.getOne(
        categoryId,
        `Version package for category ${categoryId} was not found.`
      );

      const previousVersion = getLastVersionNumber(versionsPackage.versions);
      const nextVersion = `v${Number(previousVersion) + 1}`;
      const status = 'pending';
      const updatedAt = formatDate(new Date());

      await this.categoriesVersions.save({
        _id: this.generateInternalId(categoryId, nextVersion),
        version: nextVersion,
        date: updatedAt,
        status,
        updatedAt,
        category,
      });
      await this.versionsPackage.updateVersion(categoryId, nextVersion, updatedAt);
      await this.categoriesList.updateVersion(categoryId, nextVersion, updatedAt);

      return {
        id: categoryId,
        version: nextVersion,
        status,
      };
    }, `Could not update version for category with id ${categoryId}`);
  }

  public async updateStatus([categoryId, version]: [string, string]): Promise<ManageResponse> {
    const category = await this.getOne(categoryId, version);

    if (category.status === 'active') {
      throw new BadRequestException(`Category ${categoryId} had already been activated.`);
    }

    await this.database.handleDbError(async () => {
      await this.categoriesVersions.updateOne(
        { _id: this.generateInternalId(categoryId, version) },
        {
          $set: {
            updatedAt: formatDate(new Date()),
            status: 'active',
          },
        }
      );
    });

    return {
      id: categoryId,
      version,
      status: 'active',
    };
  }

  private generateInternalId(categoryId: string, version: string): string {
    return `${categoryId}/${version}`;
  }
}
