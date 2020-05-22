import { v4 as uuid } from 'uuid';

import algorithms from './algorithms';

import { categoriesVersions } from 'lib/db/methods';
import errorBuilder from 'lib/error-builder';

import type { SelectedVariant } from 'types/transactions';
import type { TypedRequestHandler } from 'types/request-data';

import { Mode } from './types';

export const specification: TypedRequestHandler<
  { categoryId: string; version: string },
  SelectedVariant,
  { egp: string; mode: Mode }
> = async ({ params: { categoryId, version }, body: selectedVariant, query: { egp, mode } }, reply) => {
  if (!egp || !mode) {
    throw errorBuilder(400, `Not provided 'egp' or 'mode' parameter.`);
  }

  if (!(categoryId in algorithms)) {
    throw errorBuilder(400, `Can't make a specification for the category with id - '${categoryId}'. Unknown category.`);
  }

  const categoryRecord = await categoriesVersions.getOne(categoryId, version);

  if (!categoryRecord) {
    throw errorBuilder(404, `Version - '${version}' for category with id - '${categoryId}' not found.`);
  }

  const result = algorithms[categoryId]({ category: categoryRecord.category, selectedVariant, egp, mode });

  if (mode === 'json') {
    return {
      specificationId: uuid(),
    };
    // return result;
  }

  if (mode === 'rtf') {
    reply
      .header('Content-Disposition', 'attachment; filename="specification.rtf"')
      .type('application/rtf; charset=utf-8')
      .send(result);
  }
};
