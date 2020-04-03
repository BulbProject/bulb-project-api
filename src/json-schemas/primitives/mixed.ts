type mixedType = 'string' | 'number' | 'integer' | 'boolean';

export const mixed = (args: { type: mixedType[] }) => {
  return {
    type: args.type,
  };
};
