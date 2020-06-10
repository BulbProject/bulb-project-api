import { categoriesVersions, versionsPackages, categoriesList } from 'lib/db/methods';
import RequestError from 'lib/request-error';

import { formatDate, getLastVersion } from 'utils';

import { categoryAddBodySchema } from 'validation-schemas';

import buid from 'buid';

import type { Category } from 'types/data';
import type { TypedRequestHandler } from 'types/request-data';

export const updateCategory: TypedRequestHandler<
  { categoryId: string },
  Category,
  undefined,
  { authorization: string }
> = async ({ params: { categoryId }, body }) => {
  if (!categoryId) throw new RequestError(400, 'Path parameter id category is missing');

  try {
    const previousVersions = await categoriesVersions.getAllWithId(categoryId);

    if (previousVersions.length < 1) {
      throw new RequestError(404, `Category with id - '${categoryId}' not found and can't update`);
    }

    const nextVersion = `v${getLastVersion(previousVersions) + 1}`;
    const publishedDate = formatDate(new Date());

    try {
      await categoryAddBodySchema.validate(body);
    } catch ({ message }) {
      throw new RequestError(400, message);
    }

    if (categoryId !== body.id) {
      throw new RequestError(400, `Path parameter id category - '${categoryId}' is not equal to body.id - '${body.id}`);
    }

    try {
      await buid<Category>({
        path: body,
      });
    } catch ({ message }) {
      throw new RequestError(400, JSON.parse(message));
    }

    const response = await categoriesVersions.add(body, nextVersion, publishedDate);

    await versionsPackages.updateOne(categoryId, nextVersion);

    await categoriesList.updateOne(categoryId, nextVersion);

    return response;
  } catch (error) {
    if (!error.statusCode) return new RequestError(500, error.message);

    return error;
  }
};
