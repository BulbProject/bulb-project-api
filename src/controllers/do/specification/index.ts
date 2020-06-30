import algorithms from './algorithms';

import { categoriesVersions } from 'lib/db/methods';
import RequestError from 'lib/request-error';

import type { SelectedVariant } from 'types/transactions';
import type { TypedRequestHandler } from 'types/request-data';

import { Mode } from './types';

export const specification: TypedRequestHandler<
  { categoryId: string; version: string },
  SelectedVariant,
  { egp: string; mode: Mode }
> = async ({ params: { categoryId, version }, body: selectedVariant, query: { egp, mode } }, reply) => {
  if (!egp || !mode) {
    throw new RequestError(400, `Not provided 'egp' or 'mode' parameter.`);
  }

  if (!(categoryId in algorithms)) {
    throw new RequestError(
      400,
      `Can't make a specification for the category with id - '${categoryId}'. Unknown category.`
    );
  }

  const categoryRecord = await categoriesVersions.getOne(categoryId, version);

  if (!categoryRecord) {
    throw new RequestError(404, `Version - '${version}' for category with id - '${categoryId}' not found.`);
  }

  const result = await algorithms[categoryId]({
    category: categoryRecord.category,
    version,
    selectedVariant,
    egp,
    mode,
  });

  if (mode === 'json') {
    return result;
  }

  if (mode === 'docx') {
    reply
      .header('Content-Disposition', 'attachment;filename="specification.docx"')
      .header('Content-Description', 'File Transfer')
      .header('Content-Transfer-Encoding', 'binary')
      .send(Buffer.from(result));
  }
};
