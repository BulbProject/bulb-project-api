import type { RequestHandler } from 'fastify';

import { specifications } from 'lib/db/methods';
import RequestError from 'lib/request-error';

export const getSpecification: RequestHandler<
  unknown,
  unknown,
  unknown,
  { categoryId: string; version: string; specificationId: string }
> = async ({ params: { categoryId, version, specificationId } }) => {
  try {
    const result = await specifications.getOne(specificationId);

    if (!result)
      throw new RequestError(
        404,
        `Specification - ${specificationId} for category with id - ${categoryId} of version ${version} not found`
      );

    return result;
  } catch (error) {
    if (!error.statusCode) return new RequestError(500, error.message);

    return error;
  }
};
