import { Document, Schema, model } from 'mongoose';

import { CategoriesListEntity } from 'types/transport';

type CategoriesListEntityType = CategoriesListEntity &
  Document & {
    updatedAt: Date;
  };

const categoriesListEntitySchema = new Schema(
  {
    _id: String,
    version: String,
  },
  { timestamps: true, versionKey: false }
);

export const CategoriesListEntityModel = model<CategoriesListEntityType>('categories-list', categoriesListEntitySchema);
