import { v4 as uuid } from 'uuid';

import errorBuilder from 'lib/error-builder';

import refData, { weeksInYear, BulbVariants } from 'ref-data';

import type { Metric } from 'ts4ocds/extensions/metrics';
import type { Option } from 'ts4ocds/extensions/options';
import type { RequirementResponse } from 'ts4ocds/extensions/requirements';
import type { AvailableVariants } from 'types/transactions/available-variants';
import type { CalculationEngine } from '../../types';
import { Calculation } from './types';

const getValueFromResponse = (responses: RequirementResponse[], requirementId: string): unknown => {
  return responses.find(({ requirement: { id } }) => {
    return id === requirementId;
  })?.value as unknown;
};

// Name of the function is a name of current CPV code
const LightingEquipmentAndElectricLamps: CalculationEngine = ({
  category: { id, items, criteria, conversions },
  version,
  requestedNeed: {
    requestedNeed: { requirementResponses },
  },
}) => {
  const categoryId = '31500000-1';

  const calculation = Object.values(BulbVariants).reduceRight((_calculation, bulbCode) => {
    return Object.assign({}, { [bulbCode]: {} }, _calculation);
  }, {} as Calculation);
  let quantity = 0;

  const bulbTypeNeed = requirementResponses.find(({ requirement: { id } }) => /^02/.test(id))?.value as BulbVariants;

  if (!bulbTypeNeed || typeof bulbTypeNeed !== 'string') {
    throw errorBuilder(400, `Not provided type of lamp.`);
  }

  const bulbTypeNeedIsPresent = items.some((item) => item.id === bulbTypeNeed);

  if (!bulbTypeNeedIsPresent) {
    throw errorBuilder(400, `Haven't item in category with id - ${bulbTypeNeed}.`);
  }

  const techCharacteristics = refData[categoryId].techChars;
  const calculateEnergyEfficiencyClass = refData[categoryId].calculateEnergyEfficiencyClass;

  // 1) Type of need
  const typeOfNeedResponses = requirementResponses.filter(({ requirement: { id } }) => /^01/.test(id));

  const typeOfNeedResponsesIsConsistent = typeOfNeedResponses.every(({ requirement: { id } }) => {
    return typeOfNeedResponses[0].requirement.id.slice(2, 4) === id.slice(2, 4);
  });

  if (!typeOfNeedResponsesIsConsistent) {
    throw errorBuilder(
      400,
      `For requirement type criteria, requirement responses are given from different requirement groups.`
    );
  }

  // 1.1) Calculation concrete bulb
  if (typeOfNeedResponses[0].requirement.id.slice(2, 4) === '01') {
    const requirementIdForBulbPower = '0101010000';
    const requirementIdForBulbQuantity = '0101020000';

    const providedPower = typeOfNeedResponses.find(({ requirement: { id } }) => {
      return id === requirementIdForBulbPower;
    })?.value as unknown;

    if (typeof providedPower !== 'number' || providedPower <= 0) {
      throw errorBuilder(400, `Not provides correct value for bulb power for calculation concrete bulb.`);
    }

    const directoryPower =
      techCharacteristics[bulbTypeNeed].availablePowers.find(
        (availablePower: number) => availablePower >= providedPower
        // @TODO need clarification
      ) ||
      techCharacteristics[bulbTypeNeed].availablePowers[techCharacteristics[bulbTypeNeed].availablePowers.length - 1];

    const lumPerWatt = directoryPower * techCharacteristics[bulbTypeNeed].lumPerWatt;

    const providedQuantity = typeOfNeedResponses.find(({ requirement: { id } }) => {
      return id === requirementIdForBulbQuantity;
    })?.value as unknown;

    if (typeof providedQuantity !== 'number' || providedPower <= 0) {
      throw errorBuilder(400, `Not provides correct value for bulbs quantity for calculation concrete bulb.`);
    }

    quantity = providedQuantity;

    Object.keys(calculation).forEach((_) => {
      const bulbCode = _ as BulbVariants;
      const currentBulb = calculation[bulbCode];

      if (bulbCode !== bulbTypeNeed) {
        currentBulb.power =
          techCharacteristics[bulbCode].availablePowers.find(
            (availablePower: number) => availablePower >= lumPerWatt / techCharacteristics[bulbCode].lumPerWatt
            // @TODO need clarification
          ) || techCharacteristics[bulbCode].availablePowers[techCharacteristics[bulbCode].availablePowers.length - 1];
      } else {
        currentBulb.power = directoryPower;
      }

      currentBulb.lum = currentBulb.power * techCharacteristics[bulbCode].lumPerWatt;

      currentBulb.pRef =
        currentBulb.lum >= 1300
          ? 0.07341 * currentBulb.lum
          : 0.88 * Math.sqrt(currentBulb.lum + 0.49 * currentBulb.lum);

      currentBulb.eei = +(currentBulb.power / currentBulb.pRef).toFixed(2);
    });
  }

  // 1.2) Calculation light project
  if (typeOfNeedResponses[0].requirement.id.slice(2, 4) === '02') {
    const requirementIdForTypeOfRoom = '0102010000';
    const requirementIdForRoomArea = '0102020000';
    const requirementIdForQuantity = '0102030000';

    const typeOfRoom = typeOfNeedResponses.find(({ requirement: { id } }) => {
      return id === requirementIdForTypeOfRoom;
    })?.value as unknown;

    if (!typeOfRoom || typeof typeOfRoom !== 'string' || !typeOfRoom.length) {
      throw errorBuilder(400, `Not provided correct value for type of room for calculation light project.`);
    }

    const lightRateInLum = conversions
      .find(({ relatedItem }) => relatedItem === requirementIdForTypeOfRoom)
      // @TODO Need fix coefficient.value type, must be string | number | boolean
      ?.coefficients?.find(({ value }) => ((value as unknown) as string) === typeOfRoom)?.coefficient;

    if (!lightRateInLum) {
      throw errorBuilder(400, `Can't find lumen value for this type of room - ${typeOfRoom}.`);
    }

    const roomArea = typeOfNeedResponses.find(({ requirement: { id } }) => {
      return id === requirementIdForRoomArea;
    })?.value;

    if (!roomArea || typeof roomArea !== 'number' || roomArea <= 0) {
      throw errorBuilder(400, `Not provides correct value for room area for calculation light project.`);
    }

    const bulbsQuantity = typeOfNeedResponses.find(({ requirement: { id } }) => {
      return id === requirementIdForQuantity;
    })?.value as unknown;

    if (!bulbsQuantity || typeof bulbsQuantity !== 'number' || bulbsQuantity <= 0) {
      throw errorBuilder(400, `Not provided correct value for bulbs quantity for calculation light project.`);
    }

    quantity = bulbsQuantity;

    const lightRateLux = lightRateInLum * roomArea;

    Object.keys(calculation).forEach((_) => {
      const bulbCode = _ as BulbVariants;
      const currentBulb = calculation[bulbCode];

      const calculationPower = lightRateLux / bulbsQuantity / techCharacteristics[bulbCode].lumPerWatt;

      currentBulb.power =
        techCharacteristics[bulbCode].availablePowers.find(
          (availablePower: number) => availablePower >= calculationPower
          // @TODO need clarification
        ) || techCharacteristics[bulbCode].availablePowers[techCharacteristics[bulbCode].availablePowers.length - 1];

      currentBulb.lum = currentBulb.power * techCharacteristics[bulbCode].lumPerWatt;

      currentBulb.pRef =
        currentBulb.lum >= 1300
          ? 0.07341 * currentBulb.lum
          : 0.88 * Math.sqrt(currentBulb.lum + 0.49 * currentBulb.lum);

      currentBulb.eei = +(currentBulb.power / currentBulb.pRef).toFixed(2);
    });
  }

  // 1.3) Calculation custom light project
  if (typeOfNeedResponses[0].requirement.id.slice(2, 4) === '03') {
    const requirementIdForRoomArea = '0103010000';
    const requirementIdForLightLevel = '0103020000';
    const requirementIdForQuantity = '0103030000';

    const roomArea = typeOfNeedResponses.find(({ requirement: { id } }) => {
      return id === requirementIdForRoomArea;
    })?.value as unknown;

    if (!roomArea || typeof roomArea !== 'number' || roomArea <= 0) {
      throw errorBuilder(400, `Not provides correct value for room area for calculation custom light project.`);
    }

    const lightLevel = getValueFromResponse(typeOfNeedResponses, requirementIdForLightLevel);

    if (typeof lightLevel !== 'string' || !/low|regular|high|intensive/.test(lightLevel)) {
      throw errorBuilder(400, `Not provides correct value for light lever for calculation custom light project.`);
    }

    const lightRateInLum = conversions
      .find(({ relatedItem }) => relatedItem === requirementIdForLightLevel)
      // @TODO Need fix coefficient.value type, must be string | number | boolean
      ?.coefficients?.find(({ value }) => ((value as unknown) as string) === lightLevel)?.coefficient;

    if (!lightRateInLum) {
      throw errorBuilder(400, `Can't find lumen value for this type of room - ${lightLevel}.`);
    }

    const bulbsQuantity = getValueFromResponse(typeOfNeedResponses, requirementIdForQuantity);

    if (!bulbsQuantity || typeof bulbsQuantity !== 'number' || bulbsQuantity <= 0) {
      throw errorBuilder(400, `Not provided correct value for bulbs quantity for calculation light project.`);
    }

    quantity = bulbsQuantity;

    const lightRateLux = lightRateInLum * roomArea;

    Object.keys(calculation).forEach((_) => {
      const bulbCode = _ as BulbVariants;
      const currentBulb = calculation[bulbCode];

      const calculationPower = lightRateLux / bulbsQuantity / techCharacteristics[bulbCode].lumPerWatt;

      currentBulb.power =
        techCharacteristics[bulbCode].availablePowers.find(
          (availablePower: number) => availablePower >= calculationPower
          // @TODO need clarification
        ) || techCharacteristics[bulbCode].availablePowers[techCharacteristics[bulbCode].availablePowers.length - 1];

      currentBulb.lum = currentBulb.power * techCharacteristics[bulbCode].lumPerWatt;

      currentBulb.pRef =
        currentBulb.lum >= 1300
          ? 0.07341 * currentBulb.lum
          : 0.88 * Math.sqrt(currentBulb.lum + 0.49 * currentBulb.lum);

      currentBulb.eei = +(currentBulb.power / currentBulb.pRef).toFixed(2);
    });
  }

  // 2) Type of lamps/fittings
  const eeiOfBulbTypeNeed = calculation[bulbTypeNeed].eei;

  const availableBulbTypes = Object.keys(calculation).reduce((_availableBulbTypes, _) => {
    const bulbCode = _ as BulbVariants;

    if (calculation[bulbCode].eei <= eeiOfBulbTypeNeed) {
      const bulbTypes = criteria
        .flatMap((criterion) => criterion.requirementGroups)
        .find(
          (requirementGroup) =>
            requirementGroup.id ===
            requirementResponses
              .find(({ requirement: { id } }) => /^02/.test(id))
              ?.requirement.id?.replace(/[0-9]{6}$/, '000000')
        )
        // @ts-ignore @TODO need fix OptionDetails union type in ts4ocds
        ?.requirements[0]?.optionDetails?.optionGroups[0].options.flatMap((option: Option) => option.value);

      if (!bulbTypes.find((bulbType: string) => bulbType === bulbCode)) {
        return _availableBulbTypes;
      }

      return Object.assign({}, { [bulbCode]: calculation[bulbCode] }, _availableBulbTypes);
    } else {
      return _availableBulbTypes;
    }
  }, {} as Calculation);

  if (!Object.keys(availableBulbTypes).length) {
    throw errorBuilder(400, 'Not provided correct type of need.');
  }

  // 3) Bulb lifetime
  const modeOfUseResponses = requirementResponses.filter(({ requirement: { id } }) => /^03/.test(id));

  if (!modeOfUseResponses.length) {
    throw errorBuilder(400, `Not provided mode of use responses.`);
  }

  const modeOfUseResponsesIsConsistent = modeOfUseResponses.every(({ requirement: { id } }) => {
    return modeOfUseResponses[0].requirement.id.slice(2, 4) === id.slice(2, 4);
  });

  if (!modeOfUseResponsesIsConsistent) {
    throw errorBuilder(
      400,
      `For mode of use criterion, requirement responses are given from different requirement groups`
    );
  }

  if (modeOfUseResponses[0].requirement.id.slice(2, 4) === '01') {
    Object.keys(availableBulbTypes).forEach((_) => {
      const bulbCode = _ as BulbVariants;

      const workingHoursInWeek = (modeOfUseResponses[0].value as number) * (modeOfUseResponses[1].value as number);
      const workingHoursInYear = workingHoursInWeek * weeksInYear;

      availableBulbTypes[bulbCode].workingHoursInYear = workingHoursInYear;

      availableBulbTypes[bulbCode].modeOfUseLifetime = +(
        techCharacteristics[bulbCode].timeRate / workingHoursInYear
      ).toFixed(2);
    });
  }

  // 4) Economy
  const tariffsRequirements = requirementResponses.filter(({ requirement: { id } }) => /^04/.test(id));

  if (tariffsRequirements.length !== 1) {
    throw errorBuilder(400, `Not correct provided information about tariffs.`);
  }

  Object.keys(availableBulbTypes).forEach((_) => {
    const bulbCode = _ as BulbVariants;

    if (availableBulbTypes[bulbCode].workingHoursInYear) {
      availableBulbTypes[bulbCode].energyEconomy =
        ((availableBulbTypes[bulbTypeNeed].power * quantity - availableBulbTypes[bulbCode].power * quantity) *
          (availableBulbTypes[bulbCode].workingHoursInYear as number)) /
        1000;

      if (typeof tariffsRequirements[0].value === 'number' && tariffsRequirements[0].value > 0) {
        availableBulbTypes[bulbCode].financeEconomy = +(
          (availableBulbTypes[bulbTypeNeed].power * quantity * tariffsRequirements[0].value * 0.001 -
            availableBulbTypes[bulbCode].power * quantity * tariffsRequirements[0].value * 0.001) *
          (availableBulbTypes[bulbCode].workingHoursInYear as number)
        ).toFixed(2);
      }
    }
  });

  // 5) Efficiency
  Object.keys(availableBulbTypes).forEach((_) => {
    const bulbCode = _ as BulbVariants;

    availableBulbTypes[bulbCode].eeClass = calculateEnergyEfficiencyClass(availableBulbTypes[bulbCode].eei);
  });

  const availableVariants = Object.keys(availableBulbTypes).map((_) => {
    const bulbCode = _ as BulbVariants;
    const currentBulb = availableBulbTypes[bulbCode];

    const metrics: Metric[] = [];

    metrics.push({
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
          measure: techCharacteristics[bulbCode].timeRate,
          unit: {
            id: '155',
            name: 'год',
          },
        },
      ],
    });

    metrics.push({
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
    });

    if (bulbCode !== bulbTypeNeed) {
      metrics.push({
        id: '0300',
        title: 'Економічні показники',
        observations: [
          {
            id: 'serviceLife',
            notes: 'Термін служби',
            measure: (techCharacteristics[bulbCode].timeRate / techCharacteristics[bulbTypeNeed].timeRate).toFixed(1),
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
              amount: +(currentBulb.financeEconomy as number).toFixed(0),
              currency: 'грн/рік' as 'UAH',
            },
          });
        }

        metrics.find((metric) => metric.id === '0300')?.observations.push(...observations);
      }
    }

    return {
      id: uuid(),
      relatedItem: bulbCode,
      quantity,
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

  return {
    category: id,
    version,
    availableVariants: [
      availableVariants.find((variant) => variant.relatedItem === bulbTypeNeed),
      ...availableVariants
        .filter((variant) => variant.relatedItem !== bulbTypeNeed)
        .sort((variantA, variantB) => {
          return (
            (variantA.metrics[1].observations[0].measure as number) -
            (variantB.metrics[1].observations[0].measure as number)
          );
        }),
    ],
  } as AvailableVariants;
};

export default LightingEquipmentAndElectricLamps;
