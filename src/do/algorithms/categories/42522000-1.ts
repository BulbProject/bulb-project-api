import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { evaluate } from 'mathjs';
import { v4 as uuid } from 'uuid';

import { sortAvailableVariantsByMeasure } from 'shared/utils';

import { CsvService } from '../../services/csv';
import { AlgorithmEngine } from '../../entity';
import { CalculationPayload, CalculationResponse } from '../../entity/calculation';
import { SpecificationPayload, SpecificationResponse } from '../../entity/specification';
import type { AvailableVariant } from '../../entity/available-variant';

const efficiencyCategoriesMap = { '01': 'static', '02': 'total' } as const;

const variants = {
  [efficiencyCategoriesMap['01']]: [
    'axial',
    'centrifugal-forward-curved',
    'centrifugal-radial-curved',
    'centrifugal-backward-curved-without-housing',
    'centrifugal-backward-curved-with-housing',
    'mixed-flow',
  ],
  [efficiencyCategoriesMap['02']]: [
    'axial',
    'centrifugal-forward-curved',
    'centrifugal-radial-curved',
    'centrifugal-backward-curved-with-housing',
    'mixed-flow',
    'cross-flow',
  ],
};

export class IndustrialFans extends AlgorithmEngine {
  public readonly categoryId = '42522000-1';

  public constructor(private csv: CsvService) {
    super();
  }

  public async getCalculation({
    version,
    requestedNeed: {
      requestedNeed: { requirementResponses },
    },
  }: CalculationPayload): Promise<CalculationResponse> {
    if (requirementResponses.length !== 2) {
      throw new BadRequestException('A wrong requested need value was transmitted.');
    }

    const providedPower = requirementResponses.find(({ requirement: { id } }) => id === '0101010000')?.value;

    if (typeof providedPower !== 'number' || providedPower < 0.125 || providedPower > 500) {
      throw new BadRequestException('A wrong power value was transmitted.');
    }

    const variantResponse = requirementResponses.find(
      ({ requirement: { id } }) => id === '0201010000' || id === '0202010000'
    );

    if (!variantResponse) {
      throw new BadRequestException(`Variant response wasn't transmitted.`);
    }

    if (!Object.keys(efficiencyCategoriesMap).includes(variantResponse.requirement.id.slice(2, 4))) {
      throw new BadRequestException(`Variant response transmitted from unknown requirement group.`);
    }

    const efficiencyCategory: typeof efficiencyCategoriesMap[keyof typeof efficiencyCategoriesMap] =
      efficiencyCategoriesMap[variantResponse.requirement.id.slice(2, 4) as keyof typeof efficiencyCategoriesMap];

    const requestedVariant = (variantResponse.value as unknown) as typeof variants.static | typeof variants.total;

    if (
      typeof requestedVariant !== 'string' ||
      ![...new Set([...variants.static, ...variants.total])].includes(requestedVariant)
    ) {
      throw new BadRequestException('A wrong fan variant was transmitted.');
    }

    const efficiencyClassTable = await this.csv.getTable('directory', this.categoryId);

    const efficiencyClass = this.getValueFromTable(
      efficiencyClassTable,
      (row) => row[0] === requestedVariant && row[1] === efficiencyCategory,
      2
    );

    if (!efficiencyClass) {
      throw new InternalServerErrorException(
        `Can't find efficiency class for fan - ${requestedVariant} and efficiency category - ${efficiencyCategory}.`
      );
    }

    const formulasTable = await this.csv.getTable('formulas', this.categoryId);

    const efficiencyFormulas: Record<string, string> = variants[efficiencyCategory].reduce(
      (formulasObject, variant) => {
        const formula = this.getValueFromTable(
          formulasTable,
          (row) => row[0] === variant && row[1] === efficiencyCategory && evaluate(row[2], { P: providedPower }),
          3
        );

        if (!formula) {
          throw new InternalServerErrorException(
            `Can't find formula for fan - ${requestedVariant} and efficiency category - ${efficiencyCategory}.`
          );
        }

        return { ...formulasObject, [variant]: formula };
      },
      {}
    );

    const availableVariants = sortAvailableVariantsByMeasure(
      variants[efficiencyCategory].map((item) => {
        return {
          id: uuid(),
          relatedItem: item,
          quantity: 1,
          metrics: [
            {
              id: '0100',
              title: 'Показники енергоефективності',
              observations: [
                {
                  id: '0101',
                  measure: Number(
                    evaluate(efficiencyFormulas[item], { P: providedPower, N: +efficiencyClass }).toFixed(3)
                  ),
                  notes: 'Цільова енергоефективність',
                },
                {
                  id: '0102',
                  measure: providedPower,
                  notes: 'Потужність',
                  unit: {
                    id: '123',
                    name: 'кВА',
                  },
                },
                {
                  id: '0103',
                  measure: efficiencyCategory === 'static' ? 'статична' : 'загальна',
                  notes: 'Категорія ефективності',
                },
                {
                  id: '0104',
                  measure: efficiencyClass,
                  notes: 'Клас ефективності',
                },
              ],
            },
          ],
        };
      })
    );

    const availableVariantsWithoutRequested = availableVariants.filter(
      ({ relatedItem }) => relatedItem !== requestedVariant
    );

    return {
      category: this.categoryId,
      version,
      requestedVariant,
      recommendedVariant: availableVariants[0].relatedItem,
      availableVariants: [
        availableVariants.find(({ relatedItem }) => relatedItem === requestedVariant) as AvailableVariant,
        ...availableVariantsWithoutRequested,
      ],
    };
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getSpecification(payload: SpecificationPayload): SpecificationResponse {
    // @ts-ignore
    return Promise.resolve();
  }

  private getValueFromTable(
    table: string[][],
    predicate: (row: string[]) => boolean,
    cellIndex: number
  ): string | void {
    // Using for...of loop the most efficiency in this case
    // eslint-disable-next-line no-restricted-syntax
    for (const row of table) {
      if (predicate(row)) {
        return row[cellIndex];
      }
    }
  }
}
