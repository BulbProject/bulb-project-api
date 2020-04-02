import { RequestHandler } from 'fastify';

import { versionsPackages } from 'lib/db/methods';

import { VersionsPackage } from 'types/transport';

export const getVersionsPackage: RequestHandler<unknown, unknown, unknown, { categoryId: string }> = async (
  { params: { categoryId } },
  reply
) => {
  try {
    const result = await versionsPackages.getOneWithId(categoryId);

    if (!result) return reply.code(404).send(`Category with id ${categoryId} not found`);

    const normalizeData: VersionsPackage = {
      uri: result.uri,
      version: result.version,
      publisher: result.publisher,
      license: result.license,
      publicationPolicy: result.publicationPolicy,
      publishedDate: result.publishedDate,
      versions: result.versions,
    };

    return normalizeData;
  } catch (e) {
    return e;
  }
};
