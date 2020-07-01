import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

const validateUnion = (
  value: unknown,
  _arguments: ValidationArguments
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,unicorn/consistent-function-scoping
) => (type: any): boolean => {
  if (Array.isArray(type)) {
    return type.some(validateUnion(value, _arguments));
  }

  if (typeof type === 'function') {
    return value instanceof type;
  }

  if (['string', 'number', 'boolean'].includes(type)) {
    return typeof value === type;
  }

  if (type === 'integer') {
    return Number.isInteger(value);
  }

  return value === type;
};

export const IsUnion = (
  types: unknown[],
  validationOptions?: ValidationOptions
  // eslint-disable-next-line @typescript-eslint/ban-types
) => (object: Object, property: string) => {
  registerDecorator({
    name: 'mixed',
    target: object.constructor,
    propertyName: property,
    constraints: [property],
    options: validationOptions,
    validator: {
      validate: (value: unknown, _arguments: ValidationArguments): boolean => {
        if (Array.isArray(value)) {
          return value.some((valueEntry) => types.some(validateUnion(valueEntry, _arguments)));
        }

        return types.some(validateUnion(value, _arguments));
      },
      defaultMessage: (): string => {
        if (types.length < 2) {
          return `IsUnion accepts an array of at least 2 types.`;
        }

        return `${property} can only be of one of types: ${types.flatMap((type) => type).join(', ')}`;
      },
    },
  });
};
