import type { TypedRequestHandler } from 'types/request-data';
import type { RequestedNeed } from 'types/transactions';

import algorithms from './algorithms';

import { categoriesVersions } from 'lib/db/methods';
import errorBuilder from 'lib/error-builder';

export const calculation: TypedRequestHandler<{ categoryId: string; version: string }, RequestedNeed> = async ({
  body: requestedNeed,
  params: { categoryId, version },
}) => {
  if (!(categoryId in algorithms)) {
    throw errorBuilder(400, `Can't make a calculation for the category with id - '${categoryId}'. Unknown category.`);
  }

  const result = await categoriesVersions.getOne(categoryId, version);

  if (!result) throw errorBuilder(404, `Version - '${version}' for category with id - '${categoryId}' not found`);

  return algorithms[categoryId]({ category: result.category, version, requestedNeed });
};
