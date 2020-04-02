import fastify from 'fastify';

import { postCategory, putCategory } from 'controllers/manage';
import { category } from 'json-schemas';

/* @TODO Must be secure */
export const manageRoute = (app: fastify.FastifyInstance): void => {
  app.post(
    '/manage/categories/:categoryId',
    {
      schema: {
        body: {
          type: 'object',
          required: ['version', 'date', 'category'],
          properties: {
            version: {
              type: 'string',
            },
            date: {
              type: 'string',
            },
            category: category,
          },
        },
      },
    },
    postCategory
  );

  app.put('/manage/categories/:categoryId', {}, putCategory);
};
