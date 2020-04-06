import { RequestHandler } from 'fastify';

import { categoriesList } from 'lib/db/methods';
import errorBuilder from 'lib/errorBuilder';

export const getCategoriesList: RequestHandler = async (req, reply) => {
  try {
    return categoriesList.getAll();
  } catch (error) {
    return errorBuilder(500, error.message);
  }
};
