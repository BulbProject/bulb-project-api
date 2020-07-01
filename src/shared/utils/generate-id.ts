export const generateId = <O extends Record<string, unknown>>(initialId = '') => (
  object: O,
  index: number
): O & { id: string } => {
  return {
    ...object,
    id: `${initialId}${index + 1 < 10 ? `0${index + 1}` : index + 1}`,
  };
};
