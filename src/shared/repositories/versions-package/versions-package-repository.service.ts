import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

import { DatabaseService } from '../../database';

import { VersionsPackage } from './models';

@Injectable()
export class VersionsPackageRepositoryService {
  private readonly serviceHost: string;

  public constructor(
    @InjectRepository(VersionsPackage)
    private packages: MongoRepository<VersionsPackage>,
    private config: ConfigService,
    private database: DatabaseService
  ) {
    this.serviceHost = this.config.get<string>('service.url') as string;
  }

  public async getOne(
    categoryId: string,
    exceptionMessage = `Version package for category ${categoryId} was not found.`
  ): Promise<VersionsPackage> {
    return this.database.handleUndefinedValue(
      () =>
        this.packages.findOne({
          _id: categoryId,
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
        _id: categoryId,
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

  public async updateVersion(categoryId: string, version: string, updatedAt: string): Promise<void> {
    const versionPackage = await this.getOne(categoryId);

    await this.packages.updateOne(
      { _id: categoryId },
      {
        $set: {
          updatedAt,
          versions: [...versionPackage.versions, `${this.serviceHost}/categories/${categoryId}/${version}`],
        },
      }
    );
  }
}
