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
