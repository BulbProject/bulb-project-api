import { RequestHandler } from 'fastify';

import { categoriesVersions } from 'lib/db/methods';

export const getCategoryVersion: RequestHandler<
  unknown,
  unknown,
  unknown,
  { categoryId: string; version: string }
> = async ({ params: { categoryId, version } }, reply) => {
  try {
    const result = await categoriesVersions.getOne(categoryId, version);

    if (!result) return reply.code(404).send(`Version ${version} for category with id ${categoryId} not found`);

    return result;
  } catch (e) {
    return e;
  }
};
