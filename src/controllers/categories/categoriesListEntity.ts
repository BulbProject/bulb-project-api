import { RequestHandler } from 'fastify';

import { categoriesList } from 'lib/db/methods';

export const getCategoriesList: RequestHandler = async () => {
  try {
    return categoriesList.getAll();
  } catch (e) {
    return e;
  }
};
