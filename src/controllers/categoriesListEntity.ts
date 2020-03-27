import { CategoriesListEntityModel } from 'models';

const save = async (categoryId: string, version: string): Promise<{ saved: boolean } | undefined> => {
  try {
    await new CategoriesListEntityModel({ id: categoryId, version }).save();

    return { saved: true };
  } catch (e) {
    console.error(e);
  }
};

const getAll = async (): Promise<{ id: string; version: string }[] | undefined> => {
  try {
    return await CategoriesListEntityModel.find({}, '-_id -__v');
  } catch (e) {
    console.error(e);
  }
};

export default { save, getAll };
