import type { RequestHandler } from 'fastify';

import { versionsPackages } from 'lib/db/methods';
import RequestError from 'lib/request-error';

export const getVersionsPackage: RequestHandler<unknown, unknown, unknown, { categoryId: string }> = async ({
  params: { categoryId },
}) => {
  try {
    const result = await versionsPackages.getOneWithId(categoryId);

    if (!result) throw new RequestError(404, `Release package for category with id - '${categoryId}' not found`);

    return result;
  } catch (error) {
    if (!error.statusCode) return new RequestError(500, error.message);

    return error;
  }
};
