import { Document, Schema, model } from 'mongoose';

import { VersionsPackage } from 'types/transport';

type VersionsPackageModelType = VersionsPackage & Document;

const versionsPackageSchema = new Schema({
  id: String,
  uri: String,
  version: String,
  publisher: {
    name: String,
    uri: String,
  },
  license: String,
  publicationPolicy: String,
  publishedDate: String,
  versions: [String],
});

export const VersionsPackageModel = model<VersionsPackageModelType>('versions-packages', versionsPackageSchema);
