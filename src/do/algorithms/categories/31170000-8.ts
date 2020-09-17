import { BadRequestException } from '@nestjs/common';
import { evaluate } from 'mathjs';
import { v4 as uuid } from 'uuid';

import { getFormulas } from 'shared/utils';

import { AlgorithmEngine } from '../../entity';
import { CalculationPayload, CalculationResponse } from '../../entity/calculation';
import { SpecificationPayload, SpecificationResponse } from '../../entity/specification';
import type { AvailableVariant } from '../../entity/available-variant';
import { CsvService } from '../../services/csv';

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
    const requirementGroupNumber = requirementId.slice(2, 4);

    if (requirementGroupNumber === '01' || requirementGroupNumber === '02') {
      const formulasTable = await this.csv.getTable('formulas', this.categoryId);

      const calculatedValuesMap = {
        PEI: 'PEI',
      } as const;

      const formulas = getFormulas(calculatedValuesMap, formulasTable);

      if (requirementGroupNumber === '01') {
        this.rangeValidator({ exclusiveMin: 1.1, exclusiveMax: 3150, value: providedRatedPower });

        const mediumTransformers = ['liquid-immersed-medium', 'dry-type-medium'];

        const techChars = await this.calculateTechnicalCharacteristics(
          mediumTransformers,
          providedRatedPower,
          formulas
        );

        return {
          category: this.categoryId,
          version,
          recommendedVariant: techChars.sort(
            ({ efficiency: efficiencyA }, { efficiency: efficiencyB }) => efficiencyA - efficiencyB
          )[0].transformerType,
          availableVariants: techChars.map(({ transformerType, efficiency, calculationPower }) =>
            this.generateAvailableVariant(transformerType, +(efficiency * 100).toFixed(3), calculationPower)
          ),
        };
      }

      if (requirementGroupNumber === '02') {
        this.rangeValidator({ exclusiveMin: 25, exclusiveMax: 315, value: providedRatedPower });

        const transformersType = ['mounted-liquid-immersed-medium'];

        const techChars = await this.calculateTechnicalCharacteristics(transformersType, providedRatedPower, formulas);

        return {
          category: this.categoryId,
          version,
          requestedVariant: transformersType[0],
          availableVariants: [
            this.generateAvailableVariant(
              transformersType[0],
              +(techChars[0].efficiency * 100).toFixed(3),
              providedRatedPower
            ),
          ],
        };
      }
    }

    if (requirementGroupNumber === '03') {
      this.rangeValidator({ exclusiveMax: 4000, value: providedRatedPower });

      const largeTransformers = ['liquid-immersed-large', 'dry-type-large'];

      const techChars = await Promise.all(
        largeTransformers.map(async (transformerType) => {
          const directoryTable = await this.csv.getTable(transformerType, this.categoryId);
          const directoryTableData = directoryTable.filter((_, index) => index !== 0);

          const calculationPower = this.getMoreEqualPower(directoryTableData, providedRatedPower);

          const neededRowIndex = directoryTable.findIndex((value) => value[0] === `${calculationPower}`);

          return {
            transformerType,
            efficiency: +directoryTableData[neededRowIndex][1],
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
        availableVariants: techChars.map(({ transformerType, efficiency, calculationPower }) =>
          this.generateAvailableVariant(transformerType, +efficiency, calculationPower)
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

  private async calculateTechnicalCharacteristics(
    transformersTypes: string[],
    providedRatedPower: number,
    formulas: Record<string, string>
  ): Promise<{ transformerType: string; efficiency: number; calculationPower: number }[]> {
    return Promise.all(
      transformersTypes.map(async (transformerType) => {
        const directoryTable = await this.csv.getTable(transformerType, this.categoryId);
        const directoryTableData = directoryTable.filter((_, index) => index !== 0);

        const calculationPower = this.getMoreEqualPower(directoryTableData, providedRatedPower);

        const neededRowIndex = directoryTable.findIndex((value) => value[0] === `${calculationPower}`);
        const Pk = +directoryTable[neededRowIndex][1];
        const Po = +directoryTable[neededRowIndex][2];

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
  }

  private getMoreEqualPower(directoryTableData: string[][], providedRatedPower: number): number {
    return directoryTableData
      .map(([power]) => Number(power.replace('≤', '')))
      .find((availablePower) => providedRatedPower <= availablePower) as number;
  }

  private rangeValidator({
    min,
    exclusiveMin,
    max,
    exclusiveMax,
    value,
  }: {
    min?: number;
    exclusiveMin?: number;
    max?: number;
    exclusiveMax?: number;
    value: number;
  }): void {
    // Min check
    if (typeof min === 'number' && value < min) {
      throw new BadRequestException(`Rated power must be more equal than ${min} kVA.`);
    }

    // Exclusive min check
    if (typeof exclusiveMin === 'number' && value <= exclusiveMin) {
      throw new BadRequestException(`Rated power must be strictly more ${exclusiveMin} kVA.`);
    }

    // Max check
    if (typeof max === 'number' && value > max) {
      throw new BadRequestException(`Rated power must be less is equals then ${max} kVA.`);
    }

    // Exclusive max check
    if (typeof exclusiveMax === 'number' && value >= exclusiveMax) {
      throw new BadRequestException(`Rated power must be strictly less then ${exclusiveMax} kVA.`);
    }

    // Range check
    if (typeof min === 'number' && typeof max === 'number' && (value < min || value > max)) {
      throw new BadRequestException(`Rated power must be between ${min} and ${max} kVA inclusive.`);
    }

    // Exclusive range check
    if (
      typeof exclusiveMin === 'number' &&
      typeof exclusiveMax === 'number' &&
      (value <= exclusiveMin || value >= exclusiveMax)
    ) {
      throw new BadRequestException(`Rated power must be between ${exclusiveMin} and ${exclusiveMax} kVA.`);
    }
  }
}
