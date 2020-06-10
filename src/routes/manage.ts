import fastify from 'fastify';

import { addCategory, updateCategory, activateCategory } from 'controllers/manage';

import handleAuthorization from 'middleware/authorization';

import { category } from 'json-schemas';
import { object, string } from 'json-schemas/primitives';

import { createErrorSchema, errorsMap } from 'utils';

const tags = ['Manage'];
const params = {
  categoryId: string({ description: 'Category ID' }),
  version: string({ description: 'Category version' }),
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
    '/manage/add/categories/:categoryId',
    {
      onRequest: handleAuthorization,
      schema: {
        tags,
        summary: 'Add a new category',
        security,
        params: {
          categoryId: params.categoryId,
        },
        body: category,
        response: {
          200: successfulResponseSchema,
          400: createErrorSchema(errorsMap[400], 'Validation error'),
          401: createErrorSchema(errorsMap[401], 'Credentials was not received'),
          403: createErrorSchema(errorsMap[403], 'Credentials are not valid'),
          500: createErrorSchema(errorsMap[500], 'Server error'),
        },
      },
    },
    addCategory
  );

  app.put(
    '/manage/update/categories/:categoryId',
    {
      onRequest: handleAuthorization,
      schema: {
        tags,
        summary: 'Add new version for existing category',
        security,
        params: {
          categoryId: params.categoryId,
        },
        body: category,
        response: {
          200: successfulResponseSchema,
          400: createErrorSchema(errorsMap[400], 'Validation error'),
          401: createErrorSchema(errorsMap[401], 'Credentials was not received'),
          403: createErrorSchema(errorsMap[403], 'Credentials are not valid'),
          404: createErrorSchema(errorsMap[404], 'Not found category for update'),
          500: createErrorSchema(errorsMap[500], 'Server error'),
        },
      },
    },
    updateCategory
  );

  app.patch(
    '/manage/activate/categories/:categoryId/:version',
    {
      onRequest: handleAuthorization,
      schema: {
        tags,
        summary: 'Activate category version',
        security,
        params,
        body: undefined,
        response: {
          200: successfulResponseSchema,
          400: createErrorSchema(errorsMap[400], 'Validation error'),
          401: createErrorSchema(errorsMap[401], 'Credentials was not received'),
          403: createErrorSchema(errorsMap[403], 'Credentials are not valid'),
          404: createErrorSchema(errorsMap[404], 'Not found category or version for activate'),
          500: createErrorSchema(errorsMap[500], 'Server error'),
        },
      },
    },
    activateCategory
  );
};
