import { CategoryVersionModel } from 'models';

import { categoryAddBodySchema } from 'validation-schemas';

import { Category } from 'types/data';
import { CategoryVersion } from 'types/transport';

const add = async (
  category: Category,
  version: string,
  publishedDate: string
): Promise<{ id: string; version: string }> => {
  await categoryAddBodySchema.validate(category);

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

const getOne = async (categoryId: string, version: string): Promise<CategoryVersion | null | undefined> => {
  try {
    return await CategoryVersionModel.findOne(
      {
        'category.id': categoryId,
        version,
      },
      '-_id -__v'
    );
  } catch (e) {
    console.error(e);
  }
};

export default { add, getOne };
