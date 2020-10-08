import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

class Requirement {
  public expectedValue?: string | number | boolean;
}

export const IsExcluded = (validationOptions?: ValidationOptions) => (_object: Requirement, propertyName: string) => {
  registerDecorator({
    name: 'IsExcluded',
    target: _object.constructor,
    propertyName,
    constraints: [propertyName],
    options: validationOptions,
    validator: {
      validate: (_value: Requirement['expectedValue'], { object }: ValidationArguments) => {
        const { expectedValue } = object as Requirement;

        return !expectedValue;
      },
      defaultMessage: (): string => {
        return `minValue, maxValue, optionDetails and expectedValue are mutually exclusive attributes.`;
      },
    },
  });
};
