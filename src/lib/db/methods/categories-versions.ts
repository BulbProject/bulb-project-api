import { CategoryVersionModel } from 'models';

import type { Category } from 'types/data';
import type { CategoryVersion } from 'types/transport';

const add = async (
  category: Category,
  version: string,
  publishedDate: string
): Promise<{ id: string; version: string }> => {
  const newCategoryVersion = {
    _id: `${category.id}-${version}`,
    version,
    date: publishedDate,
    status: 'pending',
    category,
  };

  await new CategoryVersionModel(newCategoryVersion).save();

  return {
    id: category.id,
    version,
  };
};

const getOne = async (categoryId: string, version: string): Promise<CategoryVersion | null> => {
  return CategoryVersionModel.findOne(
    {
      'category.id': categoryId,
      version,
    },
    { _id: 0 }
  );
};

const getAllWithId = async (categoryId: string): Promise<{ _id: string }[]> => {
  return CategoryVersionModel.find({ 'category.id': categoryId });
};

const updateOne = async (categoryId: string, version: string): Promise<{ id: string; version: string }> => {
  await CategoryVersionModel.findOneAndUpdate({ 'category.id': categoryId, version }, { status: 'active' });

  return {
    id: categoryId,
    version,
  };
};

export default { add, getOne, getAllWithId, updateOne };
