import dayjs from 'dayjs';

export const formatDate = (date: Date): string => `${dayjs(date).format('YYYY-MM-DDTHH:mm:ss')}Z`;

export const getLastVersion = (versions: { _id: string }[]) => {
  return versions
    .map(version => +version._id.replace(/^.*-v/, ''))
    .sort((versionA, versionB) => versionB - versionA)[0];
};
