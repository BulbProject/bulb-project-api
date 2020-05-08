import { categoriesVersions, versionsPackages, categoriesList } from 'lib/db/methods';
import errorBuilder from 'lib/error-builder';

import { formatDate } from 'utils';

import type { ValidationError } from 'yup';
import { categoryAddBodySchema } from 'validation-schemas';

import type { Category } from 'types/data';
import type { TypedRequestHandler } from 'types/request-data';

export const addCategory: TypedRequestHandler<
  { categoryId: string },
  Category,
  undefined,
  { authorization: string }
> = async ({ params: { categoryId }, body }) => {
  if (!categoryId) throw errorBuilder(400, 'Path parameter id category is missing');

  const version = 'v1';
  const publishedDate = formatDate(new Date());

  try {
    categoryAddBodySchema.validate(body).catch((validationError: ValidationError) => {
      throw errorBuilder(400, validationError.message);
    });

    if (categoryId !== body.id) {
      throw errorBuilder(400, `Path parameter id category - '${categoryId}' is not equal to body.id - '${body.id}`);
    }

    const response = await categoriesVersions.add(body, version, publishedDate);

    await versionsPackages.add(categoryId, version, publishedDate);

    await categoriesList.add(categoryId, version);

    return response;
  } catch (error) {
    if (!error.statusCode) return errorBuilder(500, error.message);

    return error;
  }
};
