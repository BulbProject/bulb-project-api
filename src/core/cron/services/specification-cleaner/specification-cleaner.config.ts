import { registerAs } from '@nestjs/config';

interface SpecificationCleanerConfig {
  runInterval: number;
  deleteThreshold: number;
}

export const specificationCleanerConfig = registerAs(
  'specificationCleaner',
  (): SpecificationCleanerConfig => ({
    runInterval: +(process.env.SC_RUN_INTERVAL_DAYS ?? 1),
    deleteThreshold: +(process.env.SC_DELETE_THRESHOLD_DAYS ?? 7),
  })
);
