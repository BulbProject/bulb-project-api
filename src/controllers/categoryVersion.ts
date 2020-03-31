import { CategoryVersionModel } from 'models';

import { Category } from 'types/data';
import { CategoryVersion } from 'types/transport';

const add = async (
  category: Category,
  version: string,
  publishedDate: string
): Promise<{ id: string; version: string }> => {
  const metaData = {
    _id: `${category.id}-${version}`,
    version,
    date: publishedDate,
  };

  await new CategoryVersionModel(Object.assign({}, metaData, { category })).save();

  return {
    id: category.id,
    version,
  };
};

const getOne = async (categoryId: string, version: string): Promise<CategoryVersion | null> => {
  return await CategoryVersionModel.findOne(
    {
      'category.id': categoryId,
      version,
    },
    { _id: 0 }
  );
};

const getAllWithId = async (categoryId: string): Promise<{ _id: string }[]> => {
  return await CategoryVersionModel.find({ 'category.id': categoryId });
};

export default { add, getOne, getAllWithId };
