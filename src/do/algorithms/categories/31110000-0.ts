import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { sortAvailableVariantsByMeasure } from 'shared/utils';

import { AlgorithmEngine } from '../../entity';
import { AvailableVariant } from '../../entity/available-variant';
import { CalculationPayload, CalculationResponse } from '../../entity/calculation';
import { SpecificationPayload, SpecificationResponse } from '../../entity/specification';
import { CsvService } from '../../services/csv';

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

export class ElectricMotors extends AlgorithmEngine {
  public readonly categoryId = '31110000-0';

  public constructor(private csv: CsvService) {
    super();
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  public async getCalculation({
    version,
    requestedNeed: { requestedNeed },
  }: CalculationPayload): Promise<CalculationResponse> {
    const requestedNumberOfPoles = String(
      requestedNeed.requirementResponses.find(({ requirement }) => requirement.id === '0101010000')?.value
    );

    if (!['2', '4', '6', '8'].includes(requestedNumberOfPoles)) {
      throw new BadRequestException('A wrong value for the number of motor poles was transmitted.');
    }

    const nominalPowerCheck = requestedNeed.requirementResponses.find(
      ({ requirement }) => requirement.id === '0101020000'
    )?.value;

    if (typeof nominalPowerCheck !== 'boolean' && !nominalPowerCheck) {
      throw new BadRequestException('A wrong value for nominal power was transmitted.');
    }

    const requestedPower = requestedNeed.requirementResponses.find(({ requirement }) =>
      ['0201010000', '0202010000', '0203010000'].includes(requirement.id)
    )?.value as string;

    if (typeof requestedPower !== 'string') {
      throw new BadRequestException('A wrong value for requested power was transmitted.');
    }

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

    if (!efficiencyObject[requestedPower]) {
      throw new BadRequestException('A wrong value for requested power was transmitted.');
    }

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
                  measure: efficiencyObject[requestedPower][motor][requestedNumberOfPoles as string],
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

    const modeOfUse = this.tryGetModeOfUse(requestedNeed.requirementResponses, '03');

    if (modeOfUse) {
      const { hoursInDay, daysInWeek } = modeOfUse;

      const normalizedRequestedPower = /-/.test(requestedPower)
        ? requestedPower.split('-').reduce((accumulator, power) => accumulator + +power, 0) /
          requestedPower.split('-').length
        : +requestedPower;

      const tariff = this.tryGetTariff(requestedNeed.requirementResponses, '04');
      const ei1YearEnergyProduction =
        ((availableVariants.find(({ relatedItem }) => relatedItem === Variants.IE1)?.metrics[0].observations[0]
          .measure as number) || 0) *
        0.01 *
        normalizedRequestedPower *
        hoursInDay *
        daysInWeek *
        52;

      availableVariants.forEach((variant) => {
        const efficiency =
          efficiencyObject[requestedPower][variant.relatedItem as Variants][requestedNumberOfPoles as string] * 0.01;
        const yearEnergyUse = normalizedRequestedPower * hoursInDay * daysInWeek * 52;
        const yearEnergyProduction = yearEnergyUse * efficiency;
        const yearEnergyProductionImMW = yearEnergyProduction / 1000;

        variant.metrics.push({
          id: '0200',
          title: 'Економічні показники',
          observations: [
            {
              id: 'energyEconomy',
              notes: 'Виробнича ємність',
              measure: (yearEnergyProductionImMW < 0.01 ? yearEnergyProduction : yearEnergyProductionImMW).toFixed(2),
              unit: {
                id: '332',
                name: `${yearEnergyProductionImMW < 0.01 ? 'к' : 'М'}Вт/рік`,
              },
            },
          ],
        });

        if (tariff && variant.relatedItem !== Variants.IE1) {
          variant.metrics[1].observations.push({
            id: 'financeEconomy',
            notes: 'Фінансова економія',
            value: {
              amount: Number(((yearEnergyProduction - ei1YearEnergyProduction) * tariff).toFixed(0)),
              currency: 'грн/рік',
            },
          });
        }
      });
    }

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
