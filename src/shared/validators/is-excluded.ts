import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
// eslint-disable-next-line import/no-cycle
import { Requirement } from '../entity/category/requirement.entity';

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
        return `minValue, maxValue and optionDetails mutually exclusive attributes with expectedValue.`;
      },
    },
  });
};
