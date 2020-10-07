import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
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
        console.log(expectedValue);
        return !expectedValue;
      },
      defaultMessage: (): string => {
        return `If expectedValue exist, minValue, maxValue and optionDetails should not exist.`;
      },
    },
  });
};