import { categoriesVersions } from 'lib/db/methods';
import errorBuilder from 'lib/error-builder';

import { TypedRequestHandler } from 'types/request-data';

export const activateCategory: TypedRequestHandler<
  { categoryId: string; version: string },
  undefined,
  undefined,
  { authorization: string }
> = async ({ params: { categoryId, version } }) => {
  if (!categoryId) throw errorBuilder(400, 'Path parameter id category is missing');
  if (!version) throw errorBuilder(400, 'Path parameter version is missing');

  try {
    return categoriesVersions.updateOne(categoryId, version);
  } catch (error) {
    if (!error.statusCode) return errorBuilder(500, error.message);

    return error;
  }
};
