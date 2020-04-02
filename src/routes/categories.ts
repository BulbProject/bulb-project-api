import fastify from 'fastify';

import { getCategoriesList, getVersionsPackage, getCategoryVersion } from 'controllers/categories';

import { category } from 'json-schemas';

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
          200: {
            type: 'array',
            items: {
              type: 'object',
              required: ['id', 'version', 'date'],
              properties: {
                id: {
                  type: 'string',
                },
                version: {
                  type: 'string',
                },
                date: {
                  type: 'string',
                },
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
        summary: 'Versions package',
        params: {
          categoryId: params.categoryId,
        },
        response: {
          200: {
            type: 'object',
            required: ['uri', 'version', 'publisher', 'license', 'publicationPolicy', 'publishedDate', 'versions'],
            properties: {
              uri: {
                type: 'string',
              },
              version: {
                type: 'string',
              },
              publisher: {
                type: 'object',
                required: ['name', 'uri'],
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
        summary: 'Category version',
        params: {
          categoryId: params.categoryId,
          version: params.version,
        },
        response: {
          200: {
            type: 'object',
            required: ['date', 'version', 'category'],
            properties: {
              version: {
                type: 'string',
              },
              date: {
                type: 'string',
              },
              category,
            },
          },
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
