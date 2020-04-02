import fastify from 'fastify';

import { getCategoriesList, getVersionsPackage, getCategoryVersion } from 'controllers/categories';

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
            required: ['id', 'version'],
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
        params: {
          categoryId: params.categoryId,
        },
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
                required: ['name', 'uri'],
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
            required: ['publishedDate', 'publisher', 'uri', 'version', 'versions'],
          },
          404: {
            type: 'string',
            example: 'Category with id <categoryId> not found',
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
        params: {
          categoryId: params.categoryId,
          version: params.version,
        },
        response: {
          404: {
            type: 'string',
            example: 'Version <version> for category with id <categoryId> not found',
          },
        },
      },
    },
    getCategoryVersion
  );
};
