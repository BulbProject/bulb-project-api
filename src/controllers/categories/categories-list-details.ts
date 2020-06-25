import type { RequestHandler } from 'fastify';

import { categoriesList, categoriesVersions } from 'lib/db/methods';
import RequestError from 'lib/request-error';

import type { CategoryVersion } from 'types/transport';

export const getCategoriesListDetails: RequestHandler = async () => {
  try {
    const categoriesListFromDb = await categoriesList.getAll();

    return Promise.all(
      (categoriesListFromDb.map(({ id, version }) => {
        return categoriesVersions.getOne(id, version);
      }) as unknown) as CategoryVersion[]
    ).then((categoryVersions) => {
      return categoryVersions.map(({ date, category, status, version }) => ({
        id: category.id,
        version,
        date,
        status,
        title: category.title,
        description: category.description,
        image: category.documents?.find((document) => !document.relatesTo)?.url,
      }));
    });
  } catch (error) {
    return new RequestError(500, error.message);
  }
};
