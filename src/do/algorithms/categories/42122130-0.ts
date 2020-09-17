import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { evaluate } from 'mathjs';

import { getFormulas, sortAvailableVariantsByMeasure } from 'shared/utils';

import { AlgorithmEngine } from '../../entity';
import { CalculationPayload, CalculationResponse } from '../../entity/calculation';
import { SpecificationPayload, SpecificationResponse } from '../../entity/specification';
import { CsvService } from '../../services/csv';

const EndSuctionVariants = ['ESOB', 'ESCC', 'ESCCi'];

const MultistageVariants = ['MS-V', 'MSS'];

export class WaterPumps extends AlgorithmEngine {
  public readonly categoryId = '42122130-0';

  public constructor(private csv: CsvService) {
    super();
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public async getCalculation({
    version,
    requestedNeed: { requestedNeed },
  }: CalculationPayload): Promise<CalculationResponse> {
    const pumpStageCount =
      (requestedNeed.requirementResponses.find(({ requirement }) => requirement.id === '0102020000')
        ?.value as number) || 1;

    const pumpVariants = pumpStageCount === 1 ? EndSuctionVariants : MultistageVariants;

    const directoryTable = await this.csv.getTable('directory', this.categoryId);
    const formulasTable = await this.csv.getTable('formulas', this.categoryId);

    const getValueFromResponses = (requirementId: string): unknown => {
      return requestedNeed.requirementResponses.find(({ requirement: { id } }) => {
        return id === requirementId;
      })?.value as unknown;
    };

    const getEfficiency = (itemId: string): number => {
      const calculatedValuesMap = {
        Qbep: 'flowPerHour',
        ns: 'specificSpeed',
        x: 'x',
        y: 'y',
        '(ηbep)min req': 'efficiency',
      } as const;

      const formulas = getFormulas(calculatedValuesMap, formulasTable);

      const rotationSpeedRequirementId = pumpStageCount === 1 ? '0101010000' : '0102010000';
      const rotationSpeed = getValueFromResponses(rotationSpeedRequirementId) as number;

      const flowPerSecond = getValueFromResponses('0201020000');

      if (typeof flowPerSecond !== 'number' || flowPerSecond < 6 || flowPerSecond > 100) {
        throw new BadRequestException(`Flow value was provided incorrect.`);
      }

      const flowPerHour = evaluate(formulas.flowPerHour, {
        Q: flowPerSecond,
      });

      const head = getValueFromResponses('0201010000');

      if (typeof head !== 'number' || head > 140) {
        throw new BadRequestException(`Head value was provided incorrect.`);
      }

      const specificSpeed = evaluate(formulas.specificSpeed, {
        n: rotationSpeed,
        i: pumpStageCount,
        Qbep: flowPerHour,
        Hbep: head,
      });

      const specificSpeedNaturalLog = evaluate(formulas.x, {
        ns: specificSpeed,
      });

      const flowNaturalLog = evaluate(formulas.y, {
        Q: flowPerSecond,
      });
      const rowIndex = directoryTable[0].findIndex((element) => element === itemId);
      const columnIndex = directoryTable.findIndex((element) => Number(element[0]) === rotationSpeed);

      const correspondingCoefficient = Number(directoryTable[columnIndex][rowIndex]);

      const efficiency = evaluate(formulas.efficiency, {
        x: specificSpeedNaturalLog,
        y: flowNaturalLog,
        C: correspondingCoefficient,
      }).toFixed(2);

      if (efficiency <= 0 || efficiency >= 100) {
        throw new BadRequestException(
          `Incorrect data efficiency calculation for item ${itemId}. Try change parameters of pump.`
        );
      }

      return efficiency;
    };

    const availableVariants = sortAvailableVariantsByMeasure(
      pumpVariants.map((item) => {
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
                  unit: {
                    id: '43',
                    name: '%',
                  },
                },
              ],
            },
          ],
          quantity: 1,
        };
      })
    );

    return {
      category: this.categoryId,
      version,
      recommendedVariant: availableVariants[0].relatedItem,
      availableVariants,
    };
  }

  public getSpecification(_payload: SpecificationPayload): SpecificationResponse {
    return Promise.resolve({
      id: '',
    });
  }
}
