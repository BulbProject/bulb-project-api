import { v4 as uuid } from 'uuid';

import { AlgorithmEngine } from '../../entity';
import { AvailableVariant } from '../../entity/available-variant';
import { CalculationPayload, CalculationResponse } from '../../entity/calculation';
import { SpecificationPayload, SpecificationResponse } from '../../entity/specification';
import { CsvService } from '../../services/csv';

import { sortAvailableVariantsByMeasure } from '../../../shared/utils';

const poles = ['2', '4', '6', '8'];
const sliceIndent = 3;

enum Variants {
  IE1 = 'IE1',
  IE2 = 'IE2',
  IE3 = 'IE3',
  IE4 = 'IE4',
}

interface EfficiencyObject {
  [kw: string]: {
    [motor in Variants]: {
      [poles in typeof poles[number]]: number;
    };
  };
}

export class ElectricMotors implements AlgorithmEngine {
  public readonly categoryId = '31110000-0';

  public constructor(private csv: CsvService) {}

  public async getCalculation({
    version,
    requestedNeed: { requestedNeed },
  }: CalculationPayload): Promise<CalculationResponse> {
    const requestedNumberOfPoles = String(
      requestedNeed.requirementResponses.find(({ requirement }) => requirement.id === '0101010000')?.value ?? ''
    ) as string;
    const requestedPower = requestedNeed.requirementResponses.find(({ requirement }) =>
      ['0201010000', '0202010000', '0203010000'].includes(requirement.id)
    )?.value as string;

    const directoryTable = await this.csv.getTable('directory', this.categoryId);

    const powers = directoryTable.slice(sliceIndent).flatMap(([power]) => power);
    const motors = directoryTable[0].filter(Boolean) as Variants[];

    const efficiencyObject: EfficiencyObject = powers.reduce((powersMap, power) => {
      return Object.assign(powersMap, {
        [power]: motors.reduce((motorsMap, motor) => {
          return Object.assign(motorsMap, {
            [motor]: poles.reduce((polesMap, pole) => {
              return Object.assign(polesMap, {
                [pole]: directoryTable
                  .slice(sliceIndent)
                  [powers.indexOf(power)].slice(motors.indexOf(motor) * motors.length + 1)[poles.indexOf(pole)],
              });
            }, {}),
          });
        }, {}),
      });
    }, {});

    const availableVariants: AvailableVariant[] = sortAvailableVariantsByMeasure(
      motors.map((motor) => {
        return {
          id: uuid(),
          relatedItem: motor,
          metrics: [
            {
              id: '0100',
              title: 'Показники енергоефективності',
              observations: [
                {
                  id: '0101',
                  measure: efficiencyObject[requestedPower][motor][requestedNumberOfPoles],
                  notes: 'ККД',
                },
              ],
            },
          ],
          criteria: [],
          quantity: 1,
        };
      })
    );

    return {
      category: this.categoryId,
      version,
      recommendedVariant: availableVariants[0].id,
      availableVariants,
    };
  }

  public getSpecification(_payload: SpecificationPayload): SpecificationResponse {
    return Promise.resolve({
      id: '',
    });
  }
}
