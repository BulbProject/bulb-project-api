import { VersionsPackageModel } from 'models';

import { serviceConfig } from 'config';

import { VersionsPackage } from 'types/transport';

const { name, version: serviceVersion, url } = serviceConfig;

const save = async (categoryId: string, version: string, publishedDate: string): Promise<void> => {
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

const getOne = async (categoryId: string): Promise<VersionsPackage | null | undefined> => {
  try {
    return await VersionsPackageModel.findOne({ id: categoryId }, '-_id -__v -id');
  } catch (e) {
    console.error(e);
  }
};

export default { save, getOne };
