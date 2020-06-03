import type { TypedRequestHandler } from 'types/request-data';
import type { RequestedNeedPayload } from 'types/transport';

import algorithms from './algorithms';

import { categoriesVersions } from 'lib/db/methods';
import RequestError from 'lib/request-error';

export const calculation: TypedRequestHandler<{ categoryId: string; version: string }, RequestedNeedPayload> = async ({
  body,
  params: { categoryId, version },
}) => {
  if (!(categoryId in algorithms)) {
    throw new RequestError(
      400,
      `Can't make a calculation for the category with id - '${categoryId}'. Has't algorithm for calculation.`
    );
  }

  const result = await categoriesVersions.getOne(categoryId, version);

  if (!result) throw new RequestError(404, `Version - '${version}' for category with id - '${categoryId}' not found.`);

  if (result.status !== 'active') {
    throw new RequestError(400, `Category with id - '${categoryId}' and version - '${version}' not activated.`);
  }

  return algorithms[categoryId]({ category: result.category, version, requestedNeed: body.requestedNeed });
};
