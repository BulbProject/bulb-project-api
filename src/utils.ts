import dayjs from 'dayjs';
import { basename } from 'path';

import utc from 'dayjs/plugin/utc';

import { string, numeric, object } from 'json-schemas/primitives';
import refData from './ref-data';

dayjs.extend(utc);

export const formatDate = (date: Date): string => `${dayjs.utc(date).format('YYYY-MM-DDTHH:mm:ss')}Z`;

export const getLastVersion = (versions: { _id: string }[]) => {
  return versions
    .map((version) => +version._id.replace(/^.*-v/, ''))
    .sort((versionA, versionB) => versionB - versionA)[0];
};

export const createErrorSchema = (
  { statusCode, error }: { statusCode: number; error?: string },
  description?: string
) =>
  object({
    description,
    required: ['statusCode', 'error', 'message'],
    properties: {
      statusCode: numeric({ type: 'integer', example: statusCode }),
      error: string({ example: error }),
      message: string(),
    },
  });

export const generateId = <O extends Record<string, unknown>>(initialId = '') => (
  object: O,
  index: number
): O & { id: string } => {
  return {
    ...object,
    id: `${initialId}${index + 1 < 10 ? `0${index + 1}` : index + 1}`,
  };
};

export const getAlgorithmId = <S extends string = keyof typeof refData>(fileName: string): S => {
  return basename(fileName, '.ts') as S;
};

export const errorsMap = {
  400: {
    statusCode: 400,
    error: 'Bad Request',
  },
  401: {
    statusCode: 401,
    error: 'Unauthorized',
  },
  403: {
    statusCode: 403,
    error: 'Forbidden',
  },
  404: {
    statusCode: 404,
    error: 'Not Found',
  },
  500: {
    statusCode: 500,
    error: 'Internal Server Error',
  },
};
