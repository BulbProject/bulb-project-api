import fastify from 'fastify';

import { getCategoriesList, getVersionsPackage, getCategoryVersion } from 'controllers/categories';

import { category } from 'json-schemas';
import { object, string, array } from 'json-schemas/primitives';

import { generateSchemaForError, errorsMap } from 'utils';

const tags = ['Categories'];
const params = {
  categoryId: {
    type: 'string',
    description: 'Category ID',
  },
  version: {
    type: 'string',
    description: 'Category Version',
  },
};

export const categoriesRoute = (app: fastify.FastifyInstance): void => {
  app.get(
    '/categories',
    {
      schema: {
        summary: 'Categories list',
        tags,
        response: {
          200: array({
            description: 'Successful response',
            items: object({
              required: ['id', 'version', 'date'],
              properties: {
                id: string(),
                version: string(),
                date: string({ format: 'date-time' }),
              },
            }),
          }),
          500: generateSchemaForError(errorsMap[500], 'Server error'),
        },
      },
    },
    getCategoriesList
  );

  app.get(
    '/categories/:categoryId',
    {
      schema: {
        tags,
        summary: 'Versions package',
        params: {
          categoryId: params.categoryId,
        },
        response: {
          200: object({
            description: 'Successful response',
            required: ['uri', 'version', 'publisher', 'license', 'publicationPolicy', 'publishedDate', 'versions'],
            properties: {
              uri: string(),
              version: string(),
              publisher: object({
                required: ['name', 'uri'],
                properties: {
                  name: string(),
                  uri: string(),
                },
              }),
              license: string(),
              publicationPolicy: string(),
              publishedDate: string(),
              versions: array({
                items: string(),
              }),
            },
          }),
          404: generateSchemaForError(errorsMap[404], 'Versions package not found'),
          500: generateSchemaForError(errorsMap[500], 'Server error'),
        },
      },
    },
    getVersionsPackage
  );

  app.get(
    '/categories/:categoryId/:version',
    {
      schema: {
        tags,
        summary: 'Category version',
        params: {
          categoryId: params.categoryId,
          version: params.version,
        },
        response: {
          200: object({
            description: 'Successful response',
            required: ['date', 'version', 'category'],
            properties: {
              version: string(),
              date: string({ format: 'date-time' }),
              category,
            },
          }),
          404: generateSchemaForError(errorsMap[404], 'Version not found'),
          500: generateSchemaForError(errorsMap[404], 'Server error'),
        },
      },
    },
    getCategoryVersion
  );
};
