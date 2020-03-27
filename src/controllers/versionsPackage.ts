import { VersionsPackageModel } from 'models';

import { serviceConfig } from 'config';

import { VersionsPackage } from 'types/transport';

const { name, version, url } = serviceConfig;

const save = async (categoryId: string): Promise<{ saved: true } | undefined> => {
  try {
    const versionsPackageForSaving = {
      id: categoryId,
      uri: `${url}/categories/${categoryId}`,
      version,
      publisher: {
        name,
        uri: url,
      },
      license: 'http://opendefinition.org/licenses/',
      publicationPolicy: 'http://opendefinition.org/licenses/',
      /* @TODO need add real date published */
      publishedDate: '2020-02-13T13:39:05Z',
      versions: [`${url}/categories/${categoryId}/1`],
    };

    await new VersionsPackageModel(versionsPackageForSaving).save();

    return { saved: true };
  } catch (e) {
    console.error(e);
  }
};

const getOne = async (categoryId: string): Promise<VersionsPackage | null | undefined> => {
  try {
    return await VersionsPackageModel.findOne({ id: categoryId }, '-_id -__v -id');
  } catch (e) {
    console.error(e);
  }
};

export default { save, getOne };
