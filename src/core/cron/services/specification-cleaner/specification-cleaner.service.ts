import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import dayjs from 'dayjs';
import type { OpUnitType } from 'dayjs';

import { SpecificationRepositoryService } from '../../../../shared/repositories/specification';

@Injectable()
export class SpecificationCleanerService {
  public startedAt!: string;

  public constructor(
    private config: ConfigService,
    private scheduler: SchedulerRegistry,
    private specifications: SpecificationRepositoryService
  ) {
    const runInterval = this.config.get('specificationCleaner.runInterval');

    const job = new CronJob(`* 00 00/${runInterval * 24} * * *`, async () => {
      await this.clean('day');

      this.startedAt = dayjs().format('DD MMMM HH:mm:ss');

      Logger.log(`Specification cleaner has started on ${this.startedAt}`);
    });

    this.scheduler.addCronJob('Clean specifications', job);

    job.start();
  }

  private async clean(compareUnit: OpUnitType = 'day'): Promise<number> {
    const deleteThreshold = this.config.get<number>('specificationCleaner.deleteThreshold') as number;

    return this.specifications.deleteOutdated(dayjs(this.startedAt).subtract(deleteThreshold, compareUnit).toDate());
  }
}
