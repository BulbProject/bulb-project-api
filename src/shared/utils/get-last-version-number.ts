export const getLastVersionNumber = (versions: string[]): number => {
  const [, lastVersion] = [...(versions[versions.length - 1].match(/\/v(\d+)/) as RegExpMatchArray)];

  return Number(lastVersion);
};
