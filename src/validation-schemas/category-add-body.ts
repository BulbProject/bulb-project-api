import { array, boolean, object, number, string, mixed } from 'yup';
import type { Schema } from 'yup';

const id = string().required();
const title = string().required();

const optionDetails = (value: Schema<string | number>) =>
  object().shape({
    optionsGroups: array()
      .of(
        object().shape({
          id: string().required(),
          description: string(),
          options: array()
            .of(
              object().shape({
                id,
                title,
                description: string(),
                value,
              })
            )
            .min(1)
            .required(),
        })
      )
      .min(1),
  });

const classification = (scheme = 'CPV') =>
  object()
    .shape({
      scheme: string().matches(new RegExp(scheme)).required(),
      id: string().required(),
      description: string().required(),
    })
    .required();

export const categoryAddBodySchema = object()
  .shape({
    id,
    title,
    description: string().required(),
    classification: classification(),
    items: array()
      .of(
        object().shape({
          id,
          description: string().required(),
          classification: classification(),
          additionalClassifications: array().of(classification('ProzorroMarketProfile')).min(1).required(),
        })
      )
      .min(1)
      .required(),
    documents: array()
      .of(
        object().shape({
          id,
          documentType: string(),
          title,
          relatesTo: string(),
          relatedItem: string(),
          url: string(),
          datePublished: string(),
        })
      )
      .min(1),
    criteria: array()
      .of(
        object().shape({
          id,
          title,
          description: string(),
          requirementGroups: array()
            .of(
              object().shape({
                id,
                description: string(),
                requirements: array()
                  .of(
                    object().shape({
                      id,
                      title,
                      description: string(),
                      dataType: string().oneOf(['boolean', 'string', 'number', 'integer']).required(),
                      expectedValue: mixed()
                        .when('dataType', {
                          is: (dataType) => dataType === 'boolean',
                          then: boolean().required(),
                        })
                        .when('dataType', {
                          is: (dataType) => dataType === 'string',
                          then: string(),
                        })
                        .when('dataType', {
                          is: (dataType) => dataType === 'number',
                          then: number(),
                        })
                        .when('dataType', {
                          is: (dataType) => dataType === 'integer',
                          then: number().integer(),
                        }),
                      minValue: mixed()
                        .when('dataType', {
                          is: (dataType) => dataType === 'number',
                          then: number(),
                        })
                        .when('dataType', {
                          is: (dataType) => dataType === 'integer',
                          then: number().integer(),
                        }),
                      maxValue: mixed()
                        .when('dataType', {
                          is: (dataType) => dataType === 'number',
                          then: number(),
                        })
                        .when('dataType', {
                          is: (dataType) => dataType === 'integer',
                          then: number().integer(),
                        }),
                      unit: object()
                        .shape({
                          scheme: string(),
                          id,
                          name: string().required(),
                          uri: string(),
                        })
                        .default(undefined),
                      optionDetails: mixed()
                        .when('dataType', {
                          is: (dataType) => dataType === 'string',
                          then: optionDetails(string().required()),
                        })
                        .when('dataType', {
                          is: (dataType) => dataType === 'number' || dataType === 'integer',
                          then: optionDetails(number().required()),
                        }),
                    })
                  )
                  .min(1)
                  .required(),
              })
            )
            .min(1)
            .required(),
        })
      )
      .min(1)
      .required(),
    conversions: array().of(
      object().shape({
        id,
        relatesTo: string()
          .matches(/requirement/)
          .required(),
        relatedItem: string().required(),
        description: string(),
        coefficients: array()
          .of(
            object().shape({
              id,
              value: string().required(),
              coefficient: number().required(),
            })
          )
          .min(1)
          .required(),
      })
    ),
  })
  .nullable()
  .required('Empty request body');
