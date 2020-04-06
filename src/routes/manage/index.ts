import fastify from 'fastify';

import { postCategory, putCategory } from 'controllers/manage';

import handleAuthorization from './authorization';

import { category } from 'json-schemas';
import { object, string } from 'json-schemas/primitives';

import { generateSchemaForError, errorsMap } from 'utils';

const tags = ['Manage'];
const params = {
  categoryId: {
    type: 'string',
    description: 'Category ID',
  },
};
const security = [{ baseAuth: [] }];
const successfulResponseSchema = object({
  description: 'Successful response',
  required: ['id', 'version'],
  properties: {
    id: string(),
    version: string(),
  },
});

export const manageRoute = (app: fastify.FastifyInstance): void => {
  app.post(
    '/manage/categories/:categoryId',
    {
      onRequest: handleAuthorization,
      schema: {
        tags,
        summary: 'Adding of category',
        security,
        params: {
          categoryId: params.categoryId,
        },
        body: category,
        response: {
          200: successfulResponseSchema,
          400: generateSchemaForError(errorsMap[400], 'Validation error'),
          401: generateSchemaForError(errorsMap[401], 'Credentials was not received'),
          403: generateSchemaForError(errorsMap[403], 'Credentials are not valid'),
          500: generateSchemaForError(errorsMap[500], 'Server error'),
        },
      },
    },
    postCategory
  );

  app.put(
    '/manage/categories/:categoryId',
    {
      onRequest: handleAuthorization,
      schema: {
        tags,
        summary: 'Updating of category',
        security,
        params: {
          categoryId: params.categoryId,
        },
        body: category,
        response: {
          200: successfulResponseSchema,
          400: generateSchemaForError(errorsMap[400], 'Validation error'),
          401: generateSchemaForError(errorsMap[401], 'Credentials was not received'),
          403: generateSchemaForError(errorsMap[403], 'Credentials are not valid'),
          404: generateSchemaForError(errorsMap[404], 'Not found category for update'),
          500: generateSchemaForError(errorsMap[500], 'Server error'),
        },
      },
    },
    putCategory
  );
};
