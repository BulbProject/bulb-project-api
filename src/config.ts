import './lib/env';

export const serviceConfig = {
  port: +(process.env.SERVICE_PORT || 3333),
};

export const loggerConfig = {
  maxFileSizeMb: process.env.LOG_FILE_SIZE_MB || '5',
  maxFilesSaveDays: process.env.LOG_FILES_SAVE_DAYS || '30',
};
