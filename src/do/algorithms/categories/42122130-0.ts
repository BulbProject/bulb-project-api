import { v4 as uuid } from 'uuid';

import { UnprocessableEntityException } from '@nestjs/common';
import { evaluate } from 'mathjs';
import { AlgorithmEngine } from '../../entity';
import { CalculationPayload, CalculationResponse } from '../../entity/calculation';
import { SpecificationPayload, SpecificationResponse } from '../../entity/specification';
import { CsvService } from '../../services/csv';

const EndSuctionVariants = ['ESOB', 'ESCC', 'ESCCi'];

const MultistageVariants = ['MS-V', 'MSS'];

export class WaterPumps implements AlgorithmEngine {
  public readonly categoryId = '42122130-0';

  public constructor(private csv: CsvService) {}

  public async getCalculation({
    version,
    requestedNeed: { requirementResponses },
  }: CalculationPayload): Promise<CalculationResponse> {
    const pumpStageCount =
      (requirementResponses.find((res) => res.requirement.id === '0102020000')?.value as number) || 1;
    const pumpVariants = pumpStageCount === 1 ? EndSuctionVariants : MultistageVariants;

    const directoryTable = await this.csv.getTable('directory', this.categoryId);
    const formulasTable = await this.csv.getTable('formulas', this.categoryId);

    const getValueFromResponses = (requirementId: string): unknown => {
      return requirementResponses.find(({ requirement: { id } }) => {
        return id === requirementId;
      })?.value as unknown;
    };

    const getEfficiency = (itemId: string) => {
      const calculatedValuesMap = {
        ns: 'specificSpeed',
        x: 'x',
        Q: 'flowPerHour',
        y: 'y',
        '(ηbep)min req': 'efficiency',
      } as const;

      type CalculatedKeys = keyof typeof calculatedValuesMap;
      type CalculatedValues = typeof calculatedValuesMap[CalculatedKeys];
      type Formulas = Record<CalculatedValues, string>;

      const formulas: Formulas = Object.keys(calculatedValuesMap).reduce((_formulas, value) => {
        const formula = formulasTable.find(([_value]) => _value === value)?.[1];

        if (!formula) {
          throw new UnprocessableEntityException(`There is no formula for calculating "${value}"`);
        }

        return {
          ..._formulas,
          [calculatedValuesMap[value as CalculatedKeys]]: formula,
        };
      }, {} as Formulas);

      const rotationSpeedRequirementId = pumpStageCount === 1 ? '0101010000' : '0102010000';
      const rotationSpeed = getValueFromResponses(rotationSpeedRequirementId) as number;

      const flow = getValueFromResponses('0201020000') as number;
      const flowPerHour = evaluate(formulas.flowPerHour, {
        Qbep: flow,
      });
      const head = getValueFromResponses('0201010000') as number;

      const specificSpeed = evaluate(formulas.specificSpeed, {
        n: rotationSpeed,
        i: pumpStageCount,
        Qbep: flow,
        Hbep: head,
      });

      const specificSpeedNaturalLog = evaluate(formulas.x, {
        ns: specificSpeed,
      });

      const flowNaturalLog = evaluate(formulas.y, {
        Q: flowPerHour,
      });
      const rowIndex = directoryTable[0].findIndex((element) => element === itemId);
      const columnIndex = directoryTable.findIndex((element) => Number(element[0]) === rotationSpeed);

      const correspondingCoefficient = Number(directoryTable[columnIndex][rowIndex]);

      return evaluate(formulas.efficiency, {
        x: specificSpeedNaturalLog,
        y: flowNaturalLog,
        C: correspondingCoefficient,
      }).toFixed(2);
    };

    const availableVariants = pumpVariants.map((item) => {
      return {
        id: uuid(),
        relatedItem: item,
        metrics: [
          {
            id: '0100',
            title: 'Показники енергоефективності',
            observations: [
              {
                id: '0101',
                measure: getEfficiency(item),
                notes: 'ККД',
              },
            ],
          },
        ],
        criteria: [],
        quantity: 1,
      };
    });

    return {
      category: this.categoryId,
      version,
      availableVariants,
    };
  }

  public getSpecification(_payload: SpecificationPayload): SpecificationResponse {
    return Promise.resolve({
      id: '',
    });
  }
}
