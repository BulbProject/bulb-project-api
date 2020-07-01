/* eslint import/no-cycle: 0 */
import { Requirement } from '../entity/category/requirement.entity';

export const validateValueType = (
  dataType: Requirement['dataType'],
  value: string | boolean | number | undefined
): boolean => {
  switch (dataType) {
    case 'string':
    case 'number':
    case 'boolean': {
      return typeof value === dataType;
    }
    case 'integer': {
      return Number.isInteger(value);
    }
    default: {
      return true;
    }
  }
};
