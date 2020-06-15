import dayjs, { OpUnitType } from 'dayjs';

import { specifications } from 'lib/db/methods';
import logger from 'lib/logger';

interface Config {
  runInterval: number;
  deleteThreshold: number;
}

export default class SpecificationCleaner {
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

    await this.clean();

    setInterval(() => this.clean(), this.runInterval * 1000 * 60 * 24);
  }

  public async clean(compareUnit: OpUnitType = 'day'): Promise<void> {
    this.startedAt = dayjs().toDate();

    const { deleteThreshold, startedAt } = this;

    const { deletedCount } = await specifications.deleteMany({
      createdAt: {
        $lt: dayjs(startedAt).subtract(deleteThreshold, compareUnit),
      },
    });

    logger.info(`SpecificationCleaner has deleted ${deletedCount} outdated specifications.`);
  }
}
