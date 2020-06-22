import { model, Schema } from 'mongoose';
import type { Document } from 'mongoose';

import type { Specification } from 'types/data';

export type SpecificationModelType = Specification & Document;

const specificationSchema = new Schema(
  {
    _id: String,
    id: {
      type: String,
      index: true,
    },
    categoryId: String,
    version: String,
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
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const SpecificationModel = model<SpecificationModelType>('specification', specificationSchema);
