import { categoriesVersions } from 'lib/db/methods';
import RequestError from 'lib/request-error';

import { TypedRequestHandler } from 'types/request-data';

export const activateCategory: TypedRequestHandler<
  { categoryId: string; version: string },
  undefined,
  undefined,
  { authorization: string }
> = async ({ params: { categoryId, version } }) => {
  if (!categoryId) throw new RequestError(400, 'Path parameter id category is missing');
  if (!version) throw new RequestError(400, 'Path parameter version is missing');

  try {
    return categoriesVersions.updateOne(categoryId, version);
  } catch (error) {
    if (!error.statusCode) return new RequestError(500, error.message);

    return error;
  }
};
