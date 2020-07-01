/* eslint import/no-cycle: 0 */
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { Requirement } from '../entity/category/requirement.entity';
import { validateValueType } from '../utils';

export const ExpectedValue = (validationOptions?: ValidationOptions) => (_object: Requirement, property: string) => {
  registerDecorator({
    name: 'expected-value',
    target: _object.constructor,
    propertyName: property,
    constraints: [property],
    options: validationOptions,
    validator: {
      validate: (value: Requirement['expectedValue'], { object }: ValidationArguments) => {
        const { dataType } = object as Requirement;

        return validateValueType(dataType, value);
      },
      defaultMessage: ({ object }: ValidationArguments): string => {
        const { dataType } = object as Requirement;

        return `${property} type should be ${dataType}.`;
      },
    },
  });
};
