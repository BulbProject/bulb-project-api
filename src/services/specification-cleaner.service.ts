import dayjs, { OpUnitType } from 'dayjs';

import { specificationCleanerConfig } from 'config';
import { specifications } from 'lib/db/methods';
import logger from 'lib/logger';

interface Config {
  runInterval: number;
  deleteThreshold: number;
}

export class SpecificationCleaner {
  private static instance: SpecificationCleaner;

  public readonly runInterval!: number;

  public readonly deleteThreshold!: number;

  public startedAt!: Date;

  private constructor(config: Config) {
    this.runInterval = config.runInterval;
    this.deleteThreshold = config.deleteThreshold;
  }

  public static create(config: Config): SpecificationCleaner {
    if (!SpecificationCleaner.instance) {
      SpecificationCleaner.instance = new SpecificationCleaner(config);
    }

    return SpecificationCleaner.instance;
  }

  public async start(): Promise<void> {
    logger.info('SpecificationCleaner has started.');

    this.startedAt = dayjs().toDate();

    await this.clean();

    setInterval(() => this.clean(), this.runInterval * 1000 * 60 * 24);
  }

  public async clean(compareUnit: OpUnitType = 'day'): Promise<void> {
    const { deleteThreshold, startedAt } = this;

    const { deletedCount } = await specifications.deleteMany({
      createdAt: {
        $lt: dayjs(startedAt).subtract(deleteThreshold, compareUnit),
      },
    });

    logger.info(`SpecificationCleaner has deleted ${deletedCount} outdated specifications.`);
  }
}

export default SpecificationCleaner.create(specificationCleanerConfig);
