import { BadRequestException } from '@nestjs/common';
import { evaluate } from 'mathjs';
import { v4 as uuid } from 'uuid';

import { getFormulas } from 'shared/utils';

import { AlgorithmEngine } from '../../entity';
import { CalculationPayload, CalculationResponse } from '../../entity/calculation';
import { SpecificationPayload, SpecificationResponse } from '../../entity/specification';
import { CsvService } from '../../services/csv';
import { AvailableVariant } from '../../entity/available-variant';

export class Transformers extends AlgorithmEngine {
  public readonly categoryId = '31170000-8';

  public constructor(private csv: CsvService) {
    super();
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public async getCalculation({
    version,
    requestedNeed: { requestedNeed },
  }: CalculationPayload): Promise<CalculationResponse> {
    if (
      requestedNeed.requirementResponses.length !== 1 ||
      requestedNeed.requirementResponses[0].requirement.id.slice(0, 2) !== '01' ||
      requestedNeed.requirementResponses[0].requirement.id.slice(4) !== '010000'
    ) {
      throw new BadRequestException('A wrong requested need value was transmitted.');
    }

    const providedRatedPower = requestedNeed.requirementResponses[0].value;

    if (typeof providedRatedPower !== 'number') {
      throw new BadRequestException('A wrong rated power value was transmitted.');
    }

    const requirementId = requestedNeed.requirementResponses[0].requirement.id;
    const requirementGroup = requirementId.slice(2, 4);

    if (requirementGroup === '01' || requirementGroup === '02') {
      const formulasTable = await this.csv.getTable('formulas', this.categoryId);

      const calculatedValuesMap = {
        PEI: 'PEI',
      } as const;

      const formulas = getFormulas(calculatedValuesMap, formulasTable);

      if (requirementGroup === '01') {
        if (providedRatedPower < 1.1 || providedRatedPower > 3150) {
          throw new BadRequestException(
            'A wrong rated power value was transmitted. Rated power must be between 1.1 and 3150 kVA.'
          );
        }

        const mediumTransformers = ['liquid-immersed-medium', 'dry-type-medium'];

        const techChars = await Promise.all(
          mediumTransformers.map(async (transformerType) => {
            const directoryTable = await this.csv.getTable(transformerType, this.categoryId);
            const directoryTableData = directoryTable.filter((_, index) => index !== 0);

            const availablePowers = directoryTableData.map(([power]) => +power.replace('≤', ''));

            const calculationPower = availablePowers.find(
              (availablePower) => providedRatedPower <= availablePower
            ) as number;

            const needRowIndex = directoryTable.findIndex((value) => value[0] === `${calculationPower}`);
            const Pk = +directoryTable[needRowIndex][1];
            const Po = +directoryTable[needRowIndex][2];

            const efficiency = evaluate(formulas.PEI, {
              Po,
              Pco: 0,
              Pk,
              Sr: calculationPower * 1000,
            });

            return {
              transformerType,
              efficiency,
              calculationPower,
            };
          })
        );

        return {
          category: this.categoryId,
          version,
          recommendedVariant: techChars.sort(
            (transformerTypeA, transformerTypeB) => transformerTypeB.efficiency - transformerTypeA.efficiency
          )[0].transformerType,
          availableVariants: techChars.map((_) =>
            this.generateAvailableVariant(_.transformerType, +(_.efficiency * 100).toFixed(3), _.calculationPower)
          ),
        };
      }

      if (requirementGroup === '02') {
        if (providedRatedPower <= 25 || providedRatedPower >= 315) {
          throw new BadRequestException(
            'A wrong rated power value was transmitted. Rated power must be between 25 and 315 kVA.'
          );
        }

        const transformerType = 'mounted-liquid-immersed-medium';

        const directoryTable = await this.csv.getTable(transformerType, this.categoryId);
        const directoryTableData = directoryTable.filter((_, index) => index !== 0);

        const availablePowers = directoryTableData.map(([power]) => +power.replace('≤', ''));

        const calculationPower = availablePowers.find(
          (availablePower) => providedRatedPower <= availablePower
        ) as number;

        const needRowIndex = directoryTable.findIndex((value) => value[0] === `${calculationPower}`);
        const Pk = +directoryTable[needRowIndex][1];
        const Po = +directoryTable[needRowIndex][2];

        const efficiency = evaluate(formulas.PEI, {
          Po,
          Pco: 0,
          Pk,
          Sr: calculationPower * 1000,
        });

        return {
          category: this.categoryId,
          version,
          requestedVariant: transformerType,
          availableVariants: [
            this.generateAvailableVariant(transformerType, +(efficiency * 100).toFixed(3), providedRatedPower),
          ],
        };
      }
    }

    if (requirementGroup === '03') {
      if (providedRatedPower < 4000) {
        throw new BadRequestException(
          'A wrong rated power value was transmitted. Rated power must be larger 4000 kVA.'
        );
      }

      const largeTransformers = ['liquid-immersed-large', 'dry-type-large'];

      const techChars = await Promise.all(
        largeTransformers.map(async (transformerType) => {
          const directoryTable = await this.csv.getTable(transformerType, this.categoryId);
          const directoryTableData = directoryTable.filter((_, index) => index !== 0);

          const availablePowers = directoryTableData.map(([power]) => +power.replace('≤', ''));

          const calculationPower = availablePowers.find(
            (availablePower) => providedRatedPower <= availablePower
          ) as number;

          const needRowIndex = directoryTable.findIndex((value) => value[0] === `${calculationPower}`);

          return {
            transformerType,
            efficiency: +directoryTableData[needRowIndex][1],
            calculationPower,
          };
        })
      );

      return {
        category: this.categoryId,
        version,
        recommendedVariant: techChars.sort(
          (transformerTypeA, transformerTypeB) => transformerTypeB.efficiency - transformerTypeA.efficiency
        )[0].transformerType,
        availableVariants: techChars.map((_) =>
          this.generateAvailableVariant(_.transformerType, +_.efficiency, _.calculationPower)
        ),
      };
    }

    throw new BadRequestException('A wrong requirement group was transmitted.');
  }

  public async getSpecification(payload: SpecificationPayload): SpecificationResponse {
    console.log(payload);
    return Promise.resolve((undefined as unknown) as SpecificationResponse);
  }

  private generateAvailableVariant(relatedItem: string, efficiency: number, power: number): AvailableVariant {
    return {
      id: uuid(),
      relatedItem,
      quantity: 1,
      metrics: [
        {
          id: '0100',
          title: 'Показники енергоефективності',
          observations: [
            {
              id: '0101',
              measure: efficiency,
              notes: 'ККД',
              unit: {
                id: '43',
                name: '%',
              },
            },
            {
              id: '0102',
              measure: power,
              notes: 'Потужність',
              unit: {
                id: '123',
                name: 'кВА',
              },
            },
          ],
        },
      ],
    };
  }
}
