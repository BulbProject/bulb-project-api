import { RequestHandler } from 'fastify';

import { versionsPackages } from 'lib/db/methods';

export const getVersionsPackage: RequestHandler<unknown, unknown, unknown, { categoryId: string }> = async (
  { params: { categoryId } },
  reply
) => {
  try {
    const result = await versionsPackages.getOneWithId(categoryId);

    if (!result) return reply.code(404).send(`Category with id ${categoryId} not found`);

    return result;
  } catch (e) {
    return e;
  }
};
