import { Document, Schema, model } from 'mongoose';

import { CategoriesListEntity } from 'types/transport';

type CategoriesListEntityType = CategoriesListEntity & Document;

const categoriesListEntitySchema = new Schema({
  id: String,
  version: String,
});

export const CategoriesListEntityModel = model<CategoriesListEntityType>('categories-list', categoriesListEntitySchema);
