import { CategoriesListEntityModel } from 'models';

import { CategoriesListEntity } from 'types/transport';

const add = async (categoryId: string, version: string): Promise<void> => {
  const categoriesListEntityForSaving = { id: categoryId, version };

  await new CategoriesListEntityModel(categoriesListEntityForSaving).save();
};

const getAll = async (): Promise<CategoriesListEntity[] | undefined> => {
  try {
    return await CategoriesListEntityModel.find({}, '-_id -__v');
  } catch (e) {
    console.error(e);
  }
};

export default { add, getAll };
