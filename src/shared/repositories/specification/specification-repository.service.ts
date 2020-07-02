import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Criterion } from '../../entity/category';

import { DatabaseService } from '../../database';
import { formatDate } from '../../utils';

import { Specification } from './models';

@Injectable()
export class SpecificationRepositoryService {
  public constructor(
    @InjectRepository(Specification)
    private specifications: MongoRepository<Specification>,
    private database: DatabaseService
  ) {}

  public async getOne([categoryId, version, specificationId]: [string, string, string]): Promise<Specification> {
    return this.database.handleUndefinedValue(async () => {
      return this.specifications.findOne({
        id: specificationId,
      });
    }, `Specification with id ${specificationId} for category ${categoryId}-${version} was not found`);
  }

  public async deleteOutdated(beforeDate: Date): Promise<number> {
    return this.database.handleDbError(async () => {
      const { affected } = await this.specifications.delete(beforeDate);

      return affected ?? 0;
    });
  }

  public async createOne([categoryId, version]: [string, string], criteria: Criterion[]): Promise<{ id: string }> {
    const id = uuid();

    await this.specifications.save(
      plainToClass(Specification, {
        id,
        categoryId,
        version,
        criteria,
        createdAt: formatDate(new Date()),
      })
    );

    return {
      id,
    };
  }
}
