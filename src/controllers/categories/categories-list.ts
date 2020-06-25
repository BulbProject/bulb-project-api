import type { RequestHandler } from 'fastify';

import { categoriesList } from 'lib/db/methods';
import RequestError from 'lib/request-error';

export const getCategoriesList: RequestHandler = async () => {
  try {
    return categoriesList.getAll();
  } catch (error) {
    return new RequestError(500, error.message);
  }
};
