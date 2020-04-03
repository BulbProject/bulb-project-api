type mixedType = 'string' | 'number' | 'integer' | 'boolean';

export const mixed = (type: mixedType[]) => {
  return {
    type,
  };
};
