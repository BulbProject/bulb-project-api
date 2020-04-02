import fastify from 'fastify';

import { getCategoriesList, getVersionsPackage, getCategoryVersion } from 'controllers/categories';

export const categoriesRoute = (app: fastify.FastifyInstance): void => {
  app.get('/categories', {}, getCategoriesList);

  app.get('/categories/:categoryId', {}, getVersionsPackage);

  app.get('/categories/:categoryId/:version', {}, getCategoryVersion);
};
