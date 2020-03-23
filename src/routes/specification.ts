import fastify from 'fastify';

export const specification = (app: fastify.FastifyInstance): void => {
  app.register(
    (instance, opts, next) => {
      instance.get('/:category_id/:versionId', async req => {
        return `Specification for specific good from category chosen for:
         categoryId ${req.params.categoryId},
         versionId ${req.params.versionId},
         And query params:
         egp ${req.query.egp},
         mode ${req.query.mode}
         `;
      });

      instance.get('/:categoryId/:versionId/:calculationId/:variantId', async req => {
        return `Specification for specific good from category chosen for:
         categoryId ${req.params.categoryId},
         versionId ${req.params.versionId},
         calculationId ${req.params.calculationId},
         variantId ${req.params.variantId}.
         And query params:
         egp ${req.query.egp},
         mode ${req.query.mode}
         `;
      });

      next();
    },
    { prefix: 'specification' }
  );
};
