import { v4 as uuid } from 'uuid';

import refData from 'ref-data';
import { Variants } from 'ref-data/31500000-1';

import type { RequirementResponse } from 'ts4ocds/extensions/requirements';
import type { Metric } from 'ts4ocds/extensions/metrics';
import type { AvailableVariant } from 'types/transactions/available-variants';
import type { Calculation } from './types';
import type { TechCharacteristics } from 'ref-data/31500000-1';

const categoryId = '31500000-1';
export const { calculateEnergyEfficiencyClass } = refData[categoryId];

export const getValueFromResponses = (responses: RequirementResponse[], requirementId: string): unknown => {
  return responses.find(({ requirement: { id } }) => {
    return id === requirementId;
  })?.value as unknown;
};

export const getDirectoryPower = (bulbType: Variants, providedPower: number, availablePowers: number[]): number => {
  return (
    availablePowers.find(
      (availablePower: number) => {
        return availablePower >= providedPower;
      }
      // @TODO need clarification
    ) || Math.max(...availablePowers)
  );
};

export const generateAvailableVariants = (
  availableBulbTypes: Calculation,
  selectedBulbType: Variants,
  techCharacteristics: TechCharacteristics
): AvailableVariant[] => {
  const unsortedVariants: AvailableVariant[] = (Object.keys(availableBulbTypes) as Variants[]).map((bulbType) => {
    const currentBulb = availableBulbTypes[bulbType];

    const metrics: Metric[] = [];

    metrics.push(
      {
        id: '0100',
        title: 'Технічні показники',
        observations: [
          {
            id: '0101',
            notes: 'Потужність',
            measure: currentBulb.power,
            unit: {
              id: '345',
              name: 'Вт',
            },
          },
          {
            id: '0102',
            notes: 'Термін експлуатації',
            measure: techCharacteristics[bulbType].timeRate,
            unit: {
              id: '155',
              name: 'год',
            },
          },
        ],
      },
      {
        id: '0200',
        title: 'Показники енергоефективності',
        observations: [
          {
            id: '0201',
            notes: 'Індекс енергоефективності',
            measure: currentBulb.eei,
          },
          {
            id: 'energyEfficiencyClass',
            notes: 'Клас енергоефективності',
            measure: currentBulb.eeClass,
          },
        ],
      }
    );

    if (bulbType !== selectedBulbType) {
      metrics.push({
        id: '0300',
        title: 'Економічні показники',
        observations: [
          {
            id: 'serviceLife',
            notes: 'Термін служби',
            measure: (techCharacteristics[bulbType].timeRate / techCharacteristics[selectedBulbType].timeRate).toFixed(
              1
            ),
          },
        ],
      });

      if (currentBulb.energyEconomy) {
        const observations = [];

        observations.push({
          id: 'energyEconomy',
          notes: 'Менше енергії',
          measure: currentBulb.energyEconomy.toFixed(0),
          unit: {
            id: '332',
            name: 'кВт*год/рік',
          },
        });

        if (currentBulb.financeEconomy) {
          observations.push({
            id: 'financeEconomy',
            notes: 'Фінансової економії',
            value: {
              amount: +currentBulb.financeEconomy.toFixed(0),
              currency: 'грн/рік' as 'UAH',
            },
          });
        }

        metrics.find((metric) => metric.id === '0300')?.observations.push(...observations);
      }
    }

    return {
      id: uuid(),
      relatedItem: bulbType,
      quantity: availableBulbTypes[bulbType].quantity,
      metrics,
      avgValue: {
        amount: 0,
        currency: 'UAH',
      },
      relatedProducts: ['https://prozorro.gov.ua/ProzorroMarket'],
      criteria: [
        {
          id: '0100000000',
          title: 'Додаткова інформація',
          description: 'Оберіть варіант освітлення',
          requirementGroups: [
            {
              id: '0101000000',
              requirements: [
                {
                  id: '0101010000',
                  title: 'Спрямоване освітлення',
                  dataType: 'boolean',
                  expectedValue: true,
                },
              ],
            },
            {
              id: '0102000000',
              requirements: [
                {
                  id: '0102010000',
                  title: 'Розсіяне освітлення',
                  dataType: 'boolean',
                  expectedValue: true,
                },
              ],
            },
          ],
        },
      ],
    };
  });

  return [
    unsortedVariants.find((variant) => variant.relatedItem === selectedBulbType) as AvailableVariant,
    ...unsortedVariants
      .filter((variant) => variant.relatedItem !== selectedBulbType)
      .sort((variantA, variantB) => {
        return (
          (variantA.metrics[1].observations[0].measure as number) -
          (variantB.metrics[1].observations[0].measure as number)
        );
      }),
  ];
};
