import fastify from 'fastify';

import { postCategory, putCategory } from 'controllers/manage';

/* @TODO Must be secure */
export const manageRoute = (app: fastify.FastifyInstance): void => {
  app.post('/manage/categories/:categoryId', {}, postCategory);

  app.put('/manage/categories/:categoryId', {}, putCategory);
};
