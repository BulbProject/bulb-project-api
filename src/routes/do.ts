import fastify from 'fastify';

import { calculation, specification } from 'controllers/do';

import { availableVariants, selectedVariant, requestedNeed } from 'json-schemas';
import { string } from 'json-schemas/primitives';

import { calculationBodySchema } from 'validation-schemas';
import RequestError from 'lib/request-error';

import { errorsMap, createErrorSchema } from 'utils';

const tags = ['Calculation & Evaluation & Specification'];
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
        body: requestedNeed,
        response: {
          200: availableVariants,
          400: createErrorSchema(errorsMap[400], 'Validation error'),
          404: createErrorSchema(errorsMap[404], 'Category or version not found'),
        },
      },
      preValidation: async ({ body }) => {
        try {
          await calculationBodySchema.validate(body, { strict: true });
        } catch ({ message }) {
          throw new RequestError(400, message);
        }
        return;
      },
    },
    calculation
  );

  app.post('/do/evaluation/:categoryId/:version', { schema: { hide: true } }, async (req) => {
    return `Evaluation under specific category id ${req.params.categoryId} and version ${req.params.version}`;
  });

  app.post(
    '/do/specification/:categoryId/:version',
    {
      schema: {
        summary: 'Request a specification for specific good from category chosen based on data-set.',
        tags,
        params,
        querystring: {
          egp: string({ enum: ['prozorro'] }),
          mode: string({ enum: ['json', 'docx'] }),
        },
        body: selectedVariant,
        response: {
          // 200: criteria,
          400: createErrorSchema(errorsMap[400], 'Validation error'),
          404: createErrorSchema(errorsMap[404], 'Category or version not found'),
        },
      },
    },
    specification
  );
};
