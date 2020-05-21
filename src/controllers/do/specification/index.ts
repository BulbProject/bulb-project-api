import algorithms from './algorithms';

import errorBuilder from 'lib/error-builder';

import type { SelectedVariant } from 'types/transactions';
import type { TypedRequestHandler } from 'types/request-data';

import { Mode } from './types';

export const specification: TypedRequestHandler<
  { categoryId: string; version: string },
  SelectedVariant,
  { egp: string; mode: Mode }
> = async ({ params: { categoryId, version }, body: selectedVariant, query: { egp, mode } }) => {
  console.log(egp, mode);

  if (!egp || !mode) {
    throw errorBuilder(400, `Not provided 'egp' or 'mode' parameter.`);
  }

  if (!(categoryId in algorithms)) {
    throw errorBuilder(400, `Can't make a specification for the category with id - '${categoryId}'. Unknown category.`);
  }

  return algorithms[categoryId]({ selectedVariant, egp, mode });
};
