import fastify from 'fastify';

import { postCategory, putCategory } from 'controllers/manage';
import { category } from 'json-schemas';

const tags = ['Manage'];
const body = {
  type: 'object',
  required: ['version', 'date', 'category'],
  properties: {
    category,
  },
};
const params = {
  categoryId: {
    type: 'string',
    description: 'Category ID',
  },
};

/* @TODO Must be secure */
export const manageRoute = (app: fastify.FastifyInstance): void => {
  app.post(
    '/manage/categories/:categoryId',
    {
      schema: {
        tags,
        params: {
          categoryId: params.categoryId,
        },
        body,
        response: {
          400: {
            type: 'string',
            example: ['Path parameter categoryId is missing', 'Path parameter categoryId is not equal to body.id'],
          },
        },
      },
    },
    postCategory
  );

  app.put(
    '/manage/categories/:categoryId',
    {
      schema: {
        tags,
        params: {
          categoryId: params.categoryId,
        },
        body,
        response: {
          400: {
            type: 'string',
            example: [
              'Category with id <categoryId> not found and can`t update',
              'Path parameter categoryId is not equal to body.id',
            ],
          },
        },
      },
    },
    putCategory
  );
};
