import pino from 'pino';
import type { LoggerOptions } from 'pino';

export const loggerOptions: LoggerOptions = {
  name: 'Bulb API',
  prettyPrint: {
    crlf: true,
  },
};

const logger = pino(loggerOptions);

export default logger;
