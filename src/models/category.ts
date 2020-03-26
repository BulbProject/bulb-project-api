import { Document, Schema, model } from 'mongoose';

import { CategoryVersion } from 'types/transport/category-version';

type CategoryModel = CategoryVersion & Document;

const categoryModel = new Schema(
  {
    _id: String,
    version: String,
    date: String,
    category: {
      id: String,
      title: String,
      description: String,
      classification: {
        id: String,
        _schema: String,
        description: String,
      },
      items: [
        {
          id: String,
          description: String,
          classification: {
            id: String,
            _schema: String,
            description: String,
          },
          additionalClassifications: [
            {
              id: String,
              _schema: String,
              description: String,
            },
          ],
        },
      ],
      criteria: [
        {
          id: String,
          title: String,
          description: String,
          relatesTo: String,
          relatedItem: String,
          requirementGroups: [
            {
              id: String,
              description: String,
              requirements: [
                {
                  id: String,
                  title: String,
                  description: String,
                  dataType: String,
                  value: {},
                  minValue: Number,
                  maxValue: Number,
                  period: {
                    startDate: String,
                    endDate: String,
                    maxExtentDate: String,
                    durationInDays: Number,
                  },
                  optionDetails: {
                    optionGroups: [
                      {
                        id: String,
                        description: String,
                        relatesTo: String,
                        options: [
                          {
                            id: String,
                            description: String,
                            placeOfPerformance: {
                              addressDetails: {
                                country: {
                                  scheme: String,
                                  id: String,
                                  description: String,
                                  uri: String,
                                },
                                region: {
                                  scheme: String,
                                  id: String,
                                  description: String,
                                  uri: String,
                                },
                                locality: {
                                  scheme: String,
                                  id: String,
                                  description: String,
                                  uri: String,
                                },
                              },
                              streetAddress: String,
                              postalCode: String,
                            },
                            contractPeriod: {
                              startDate: String,
                              endDate: String,
                            },
                            value: {},
                            minValue: Number,
                            maxValue: Number,
                            period: {
                              startDate: String,
                              endDate: String,
                              maxExtentDate: String,
                              durationInDays: Number,
                            },
                            measure: {},
                            unit: {
                              scheme: String,
                              id: String,
                              name: String,
                              uri: String,
                            },
                          },
                        ],
                      },
                    ],
                    optionsToCombine: [
                      {
                        id: String,
                        relatedOptions: [String],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
      conversions: [
        {
          id: String,
          relatesTo: String,
          relatedItem: String,
          rationale: String,
          description: String,
          coefficients: [
            {
              id: String,
              value: {},
              minValue: Number,
              maxValue: Number,
              period: {
                startDate: String,
                endDate: String,
                maxExtentDate: String,
                durationInDays: Number,
              },
              coefficient: Number,
              formula: String,
            },
          ],
        },
      ],
    },
  },
  {
    _id: false,
    id: false,
  }
);

export const CategoryModel = model<CategoryModel>('categories', categoryModel);
