import { CategoriesListEntityModel } from 'models';

import { CategoriesListEntity } from 'types/transport';

const add = async (categoryId: string, version: string): Promise<void> => {
  const categoriesListEntityForSaving = { _id: categoryId, version };

  await new CategoriesListEntityModel(categoriesListEntityForSaving).save();
};

const getAll = async (): Promise<CategoriesListEntity[] | undefined> => {
  try {
    return await CategoriesListEntityModel.find({}, '-_id -__v');
  } catch (e) {
    console.error(e);
  }
};

const updateOne = async (categoryId: string, version: string): Promise<void> => {
  await CategoriesListEntityModel.findOneAndUpdate({ _id: categoryId }, { _id: categoryId, version });
};

export default { add, updateOne, getAll };
