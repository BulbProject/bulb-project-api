import { RequestHandler } from 'fastify';

import { versionsPackages } from 'lib/db/methods';
import errorBuilder from 'lib/errorBuilder';

export const getVersionsPackage: RequestHandler<unknown, unknown, unknown, { categoryId: string }> = async ({
  params: { categoryId },
}) => {
  try {
    const result = await versionsPackages.getOneWithId(categoryId);

    if (!result) throw errorBuilder(404, `Release package for category with id - '${categoryId}' not found`);

    return result;
  } catch (error) {
    if (!error.statusCode) return errorBuilder(500, error.message);

    return error;
  }
};
