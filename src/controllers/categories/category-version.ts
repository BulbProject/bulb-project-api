import type { RequestHandler } from 'fastify';

import { categoriesVersions } from 'lib/db/methods';
import RequestError from 'lib/request-error';

export const getCategoryVersion: RequestHandler<
  unknown,
  unknown,
  unknown,
  { categoryId: string; version: string }
> = async ({ params: { categoryId, version } }) => {
  try {
    const result = await categoriesVersions.getOne(categoryId, version);

    if (!result) throw new RequestError(404, `Version - '${version}' for category with id - '${categoryId}' not found`);

    return result;
  } catch (error) {
    if (!error.statusCode) return new RequestError(500, error.message);

    return error;
  }
};
