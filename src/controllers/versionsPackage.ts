import { VersionsPackageModel } from 'models';

import { serviceConfig } from 'config';

import { VersionsPackage } from 'types/transport';

const { name, version: serviceVersion, url } = serviceConfig;

const add = async (categoryId: string, version: string, publishedDate: string): Promise<void> => {
  const versionsPackageForSaving = {
    _id: categoryId,
    id: categoryId,
    uri: `${url}/categories/${categoryId}`,
    version: serviceVersion,
    publisher: {
      name,
      uri: url,
    },
    license: 'http://opendefinition.org/licenses/',
    publicationPolicy: 'http://opendefinition.org/licenses/',
    publishedDate,
    versions: [`${url}/categories/${categoryId}/${version}`],
  };

  await new VersionsPackageModel(versionsPackageForSaving).save();
};

const getOne = async (categoryId: string): Promise<VersionsPackage | null> => {
  return await VersionsPackageModel.findById(categoryId, '-_id -__v -id');
};

const updateOne = async (categoryId: string, version: string): Promise<void> => {
  const versionsPackage = await getOne(categoryId);

  if (!versionsPackage) throw new Error(`Can't find version package for category with id - ${categoryId}`);

  const { versions } = versionsPackage;

  await VersionsPackageModel.findOneAndUpdate(
    { _id: categoryId },
    { versions: [...versions, `${url}/categories/${categoryId}/${version}`] }
  );
};

export default { add, updateOne, getOne };
