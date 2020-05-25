import fastify from 'fastify';
import { getSpecification } from '../controllers/specifications';

export const specificationRoute = (app: fastify.FastifyInstance): void => {
  app.get('/specifications/:categoryId/:version/:specificationId', {}, getSpecification);

  app.get('/specification/:categoryId/:version/:calculationId/:variantId', { schema: { hide: true } }, async (req) => {
    return `Specification for specific good from category chosen for:
         categoryId ${req.params.categoryId},
         version ${req.params.version},
         calculationId ${req.params.calculationId},
         variantId ${req.params.variantId}.
         And query params:
         egp ${req.query.egp},
         mode ${req.query.mode}
         `;
  });
};
