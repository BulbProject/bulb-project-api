import { VersionsPackageModel } from 'models';

import { serviceConfig } from 'config';

import { VersionsPackage } from 'types/transport';

const save = async (categoryId: string): Promise<{ saved: true } | undefined> => {
  try {
    const versionsPackageForSaving = {
      id: categoryId,
      uri: `${serviceConfig.url}/categories/${categoryId}`,
      version: serviceConfig.version,
      publisher: {
        name: serviceConfig.name,
        uri: serviceConfig.url,
      },
      license: 'http://opendefinition.org/licenses/',
      publicationPolicy: 'http://opendefinition.org/licenses/',
      /* @TODO need add real date published */
      publishedDate: '2020-02-13T13:39:05Z',
      versions: [`${serviceConfig.url}/categories/${categoryId}/1`],
    };

    new VersionsPackageModel(versionsPackageForSaving).save();

    return { saved: true };
  } catch (e) {
    console.error(e);
  }
};

const getOne = async (categoryId: string): Promise<VersionsPackage | null | undefined> => {
  try {
    return VersionsPackageModel.findOne({ id: categoryId }, '-_id -__v -id');
  } catch (e) {
    console.error(e);
  }
};

export default { save, getOne };
