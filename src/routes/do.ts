import fastify from 'fastify';

import { calculation } from 'controllers/do';

import { object, string } from 'json-schemas/primitives';
import { requestedNeed } from 'json-schemas';

const tags = ['Calculation & Evaluation'];
const params = {
  categoryId: string({ description: 'Category ID' }),
  version: string({ description: 'Category version' }),
};

export const doRoute = (app: fastify.FastifyInstance): void => {
  app.post(
    '/do/calculation/:categoryId/:version',
    {
      schema: {
        summary: 'Request a calculation under specific category based on data-set',
        tags,
        params,
        body: object({
          required: ['requestedNeed'],
          properties: {
            requestedNeed,
          },
        }),
      },
    },
    calculation
  );

  app.post('/do/evaluation/:categoryId/:version', { schema: { hide: true } }, async req => {
    return `Evaluation under specific category id ${req.params.categoryId} and version ${req.params.version}`;
  });
};
