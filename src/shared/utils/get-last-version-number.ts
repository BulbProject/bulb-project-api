export const getLastVersionNumber = (versions: string[]): string => {
  const [, lastVersion] = [...(versions[versions.length - 1].match(/\/v(\d+)/) as RegExpMatchArray)];

  return lastVersion;
};
