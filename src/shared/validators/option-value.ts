/* eslint import/no-cycle: 0 */
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { Requirement } from '../entity/category/requirement.entity';
import { validateValueType } from '../utils';
import { OptionGroup } from '../entity/category/option-group.entity';

export const OptionValue = (validationOptions?: ValidationOptions) => (_object: Requirement, property: string) => {
  registerDecorator({
    name: 'expected-value',
    target: _object.constructor,
    propertyName: property,
    constraints: [property],
    options: validationOptions,
    validator: {
      validate: (value: Requirement['optionDetails'], { object }: ValidationArguments) => {
        const { dataType } = object as Requirement;

        if (value) {
          return !!(value.optionGroups as OptionGroup[] | undefined)
            ?.flatMap(({ options }) => options)
            .every(({ value: optionValue }) => {
              return validateValueType(dataType, optionValue);
            });
        }

        return true;
      },
      defaultMessage: ({ object }: ValidationArguments): string => {
        const { dataType } = object as Requirement;

        return `Option's value type should be ${dataType}.`;
      },
    },
  });
};
