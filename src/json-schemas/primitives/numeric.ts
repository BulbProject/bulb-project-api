type NumericType = 'number' | 'integer' | 'mixed';

interface NumericProps {
  type: NumericType;
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  example?: number;
}

export const numeric = (args?: NumericProps) => {
  const getType = (type: NumericType = 'number') => {
    if (type === 'mixed') return ['integer', 'number'];

    return type;
  };
  const filteredArgs = args ? (({ type, ...rest }) => rest)(args) : {};

  return {
    type: getType(),
    ...filteredArgs,
  };
};
