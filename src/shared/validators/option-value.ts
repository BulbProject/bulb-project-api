/* eslint import/no-cycle: 0 */
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { Requirement } from '../entity/category/requirement.entity';
import { validateValueType } from '../utils';
import { OptionGroup } from '../entity/category/option-group.entity';
import { Option } from '../entity/category';

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
            ?.flatMap(({ options }) => options as Option[] | undefined)
            .every((option) => {
              return validateValueType(dataType, option?.value);
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
