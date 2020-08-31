import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { DatabaseService } from '../../database';

import { VersionsPackage } from './models';

@Injectable()
export class VersionsPackageRepositoryService {
  public constructor(
    @InjectRepository(VersionsPackage)
    private packages: MongoRepository<VersionsPackage>,
    private config: ConfigService,
    private database: DatabaseService
  ) {}

  public async getOne(
    categoryId: string,
    exceptionMessage = `Version package for category ${categoryId} was not found.`
  ): Promise<VersionsPackage> {
    return this.database.handleUndefinedValue(
      () =>
        this.packages.findOne({
          id: categoryId,
        }),
      exceptionMessage
    );
  }

  public async createOne([categoryId, version]: [string, string], publishedDate: string): Promise<void> {
    const url = this.config.get<string>('service.url');
    const serviceVersion = this.config.get<string>('service.version');
    const name = this.config.get<string>('service.name');

    await this.database.handleDbError(async () => {
      await this.packages.save({
        id: categoryId,
        uri: `${url}/categories/${categoryId}`,
        version: serviceVersion,
        publisher: {
          name,
          uri: url,
        },
        license: 'http://opendefinition.org/licenses/',
        publicationPolicy: 'http://opendefinition.org/licenses/',
        publishedDate,
        createdAt: publishedDate,
        versions: [`${url}/categories/${categoryId}/${version}`],
      });
    });
  }

  public async updateVersion([categoryId, version]: [string, string], updatedAt: string): Promise<void> {
    const versionPackage = await this.getOne(categoryId);

    await this.database.handleDbError(async () => {
      const url = this.config.get<string>('service.url');

      await this.packages.save({
        ...versionPackage,
        updatedAt,
        versions: [...versionPackage.versions, `${url}/categories/${categoryId}/${version}`],
      });
    });
  }
}
