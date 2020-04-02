import fastify from 'fastify';

import { getCategoriesList, getVersionsPackage, getCategoryVersion } from 'controllers/categories';

const tags = ['Categories'];

export const categoriesRoute = (app: fastify.FastifyInstance): void => {
  app.get(
    '/categories',
    {
      schema: {
        tags,
        response: {
          200: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              version: {
                type: 'string',
              },
            },
          },
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
        response: {
          200: {
            type: 'object',
            properties: {
              uri: {
                type: 'string',
              },
              version: {
                type: 'string',
              },
              publisher: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  uri: {
                    type: 'string',
                  },
                },
              },
              license: {
                type: 'string',
              },
              publicationPolicy: {
                type: 'string',
              },
              publishedDate: {
                type: 'string',
              },
              versions: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
            },
          },
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
      },
    },
    getCategoryVersion
  );
};
