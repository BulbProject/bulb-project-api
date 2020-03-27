import { CategoryVersionModel } from 'models';

import { Category } from 'types/data';
import { CategoryVersion } from 'types/transport';

const save = async (category: Category): Promise<{ id: string; version: string } | undefined> => {
  try {
    /* @TODO need change to real data */
    const categoryVersionForSaving = {
      _id: '123',
      version: '1',
      date: '2018-10-18T06:20:14Z',
      category,
    };

    await new CategoryVersionModel(categoryVersionForSaving).save();

    return {
      id: category.id,
      version: '1',
    };
  } catch (e) {
    console.error(e);
  }
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

export default { save, getOne };
