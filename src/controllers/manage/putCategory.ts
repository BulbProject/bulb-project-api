import { RequestHandler } from 'fastify';

import { categoriesVersions, versionsPackages, categoriesList } from 'lib/db/methods';
import errorBuilder from 'lib/errorBuilder';

import { formatDate, getLastVersion } from 'utils';

import { categoryAddBodySchema } from 'validation-schemas';

import { Category } from 'types/data';
import { ValidationError } from 'yup';

export const putCategory: RequestHandler<
  unknown,
  unknown,
  unknown,
  { categoryId: string },
  unknown,
  Category
> = async ({ params: { categoryId }, body }) => {
  if (!categoryId) throw errorBuilder(400, 'Path parameter id category is missing');

  try {
    const previousVersions = await categoriesVersions.getAllWithId(categoryId);

    if (previousVersions.length < 1) {
      throw errorBuilder(404, `Category with id - '${categoryId}' not found and can't update`);
    }

    const nextVersion = `v${getLastVersion(previousVersions) + 1}`;
    const publishedDate = formatDate(new Date());

    categoryAddBodySchema.validate(body).catch((validationError: ValidationError) => {
      throw errorBuilder(400, validationError.message);
    });

    if (categoryId !== body.id) {
      throw errorBuilder(400, `Path parameter id category - '${categoryId}' is not equal to body.id - '${body.id}`);
    }

    const response = await categoriesVersions.add(body, nextVersion, publishedDate);

    await versionsPackages.updateOne(categoryId, nextVersion);

    await categoriesList.updateOne(categoryId, nextVersion);

    return response;
  } catch (error) {
    if (!error.statusCode) return errorBuilder(500, error.message);

    return error;
  }
};
