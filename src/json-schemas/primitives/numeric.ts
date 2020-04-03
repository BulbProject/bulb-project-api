type numericType = 'number' | 'integer' | 'mixed';

interface NumberProps {
  type: numericType;
  multipleOf?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maximum?: number;
  exclusiveMaximum?: number;
}

export const numeric = (args?: NumberProps) => {
  const getType = () => {
    switch (args?.type) {
      case 'integer':
        return 'integer';
      case 'number':
        return 'number';
      case 'mixed':
      default:
        return ['integer', 'number'];
    }
  };

  const filteredArgs = args ? (({ type, ...rest }) => rest)(args) : {};

  return {
    type: getType(),
    ...filteredArgs,
  };
};
