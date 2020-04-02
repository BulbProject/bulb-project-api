import { RequestHandler } from 'fastify';

import { categoriesVersions } from 'lib/db/methods';

import { CategoryVersion } from 'types/transport';

export const getCategoryVersion: RequestHandler<
  unknown,
  unknown,
  unknown,
  { categoryId: string; version: string }
> = async ({ params: { categoryId, version } }, reply) => {
  try {
    const result = await categoriesVersions.getOne(categoryId, version);

    if (!result) return reply.code(404).send(`Version ${version} for category with id ${categoryId} not found`);

    const normalizeData: CategoryVersion = {
      version: result.version,
      date: result.date,
      category: {
        id: result.category.id,
        title: result.category.title,
        description: result.category.description,
        classification: {
          scheme: result.category.classification.scheme,
          id: result.category.classification.id,
          description: result.category.classification.description,
        },
        items: result.category.items.map(({ id, description, classification, additionalClassifications }) => ({
          id,
          description,
          classification: {
            scheme: classification.scheme,
            id: classification.id,
            description: classification.description,
          },
          additionalClassifications: additionalClassifications?.map(({ scheme, id, description }) => ({
            scheme,
            id,
            description,
          })),
        })),
        // @ts-ignore
        criteria: result.category.criteria.map(({ id, title, description, requirementGroups }) => ({
          id,
          title,
          description,
          requirementGroups: requirementGroups.map(({ id, description, requirements }) => ({
            id,
            description,
            requirements: requirements.map(
              ({ id, title, description, dataType, expectedValue, minValue, maxValue, period, optionDetails }) => ({
                id,
                title,
                description,
                dataType,
                expectedValue,
                minValue,
                maxValue,
                period,
                optionDetails: {
                  optionGroups: optionDetails?.optionGroups?.map(({ id, description, relatesTo, options }) => ({
                    id,
                    description,
                    relatesTo,
                    options: options.map(({ id, description, value }) => ({ id, description, value })),
                  })),
                  optionsToCombine: optionDetails?.optionsToCombine?.map(({ id, relatedOptions }) => ({
                    id,
                    relatedOptions,
                  })),
                },
              })
            ),
          })),
        })),
        conversions: result.category.conversions.map(
          ({ id, description, rationale, relatesTo, relatedItem, coefficients }) => ({
            id,
            description,
            rationale,
            relatesTo,
            relatedItem,
            coefficients: coefficients.map(({ id, value, minValue, maxValue, period, coefficient }) => ({
              id,
              value,
              minValue,
              maxValue,
              period,
              coefficient,
            })),
          })
        ),
      },
    };

    return normalizeData;
  } catch (e) {
    return e;
  }
};
