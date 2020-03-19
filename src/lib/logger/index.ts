import * as winston from 'winston';
import 'winston-daily-rotate-file';

import { loggerConfig } from 'config';

const { format, transports } = winston;
const { combine, timestamp, printf, colorize, align, errors } = format;

const errorFormat = printf(({ timestamp: messageTimestamp, stack, message }) => {
  const errorObject = {
    message,
    messageTimestamp,
    stack,
  };

  return JSON.stringify(errorObject, null, 2);
});

const logger = winston.createLogger({
  format: timestamp({
    format: 'DD-MM-YYYY HH:mm:ss',
  }),
  transports: [
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        align(),
        printf(({ level, message, timestamp: messageTimestamp }) => `${level}: ${messageTimestamp} --> ${message}`)
      ),
    }),
    new transports.DailyRotateFile({
      level: 'error',
      dirname: './logs',
      filename: 'errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD:HH:mm:ss',
      maxSize: `${loggerConfig.maxFileSizeMb}m`,
      maxFiles: `${loggerConfig.maxFilesSaveDays}d`,
      format: combine(errors({ stack: true }), errorFormat),
    }),
  ],
});

winston.addColors({ info: 'blue' });

export default logger;
