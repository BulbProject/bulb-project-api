import { Document, Schema, model } from 'mongoose';

import { CategoryVersion } from 'types/transport';

type CategoryVersionsModelType = CategoryVersion & Document;

const classificationSchema = new Schema(
  {
    id: String,
    scheme: String,
    description: String,
  },
  { _id: false }
);

const categoryVersionSchema = new Schema(
  {
    _id: String,
    version: String,
    date: String,
    category: {
      id: {
        type: String,
        index: true,
      },
      title: String,
      description: String,
      classification: classificationSchema,
      items: [
        {
          _id: false,
          id: String,
          description: String,
          classification: classificationSchema,
          additionalClassifications: [classificationSchema],
        },
      ],
      criteria: [
        {
          _id: false,
          id: String,
          title: String,
          description: String,
          requirementGroups: [
            {
              _id: false,
              id: String,
              description: String,
              requirements: [
                {
                  _id: false,
                  id: String,
                  title: String,
                  description: String,
                  dataType: String,
                  expectedValue: {},
                  minValue: Number,
                  maxValue: Number,
                  unit: {
                    scheme: String,
                    id: String,
                    name: String,
                    uri: String,
                  },
                  period: {
                    startDate: String,
                    endDate: String,
                    maxExtentDate: String,
                    durationInDays: Number,
                  },
                  optionDetails: {
                    optionGroups: {
                      type: [
                        {
                          _id: false,
                          id: String,
                          description: String,
                          relatesTo: String,
                          options: [
                            {
                              _id: false,
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
                      default: undefined,
                    },
                    optionsToCombine: {
                      type: [
                        {
                          _id: false,
                          id: String,
                          relatedOptions: [String],
                        },
                      ],
                      default: undefined,
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      conversions: [
        {
          _id: false,
          id: String,
          relatesTo: String,
          relatedItem: String,
          rationale: String,
          description: String,
          coefficients: [
            {
              _id: false,
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
  { versionKey: false }
);

export const CategoryVersionModel = model<CategoryVersionsModelType>('categories-versions', categoryVersionSchema);
