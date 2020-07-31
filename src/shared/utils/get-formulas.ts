import { UnprocessableEntityException } from '@nestjs/common';

export const getFormulas = (calculatedValuesMap: Record<string, string>, formulasTable: string[][]) => {
  type CalculatedKeys = keyof typeof calculatedValuesMap;
  type CalculatedValues = typeof calculatedValuesMap[CalculatedKeys];
  type Formulas = Record<CalculatedValues, string>;

  return Object.keys(calculatedValuesMap).reduce((_formulas, value) => {
    const formula = formulasTable.find(([_value]) => _value === value)?.[1];

    if (!formula) {
      throw new UnprocessableEntityException(`There is no formula for calculating "${value}"`);
    }

    return {
      ..._formulas,
      [calculatedValuesMap[value as CalculatedKeys]]: formula,
    };
  }, {} as Formulas);
};
