import { v4 as uuid } from 'uuid';

import errorBuilder from 'lib/error-builder';

import type { AlgorithmEngine } from 'types/algorithm-engine';
import { AvailableVariant } from 'types/transactions';

import { weeksInYear, techCharacteristics, calculateEnergyEfficiencyClass } from './directories';

import { BulbTypes, Calculation } from './types';

// Name of the function is a name of current CPV code
const LightingEquipmentAndElectricLamps: AlgorithmEngine = ({
  category: { id, items, conversions },
  version,
  requestedNeed: {
    requestedNeed: { requirementResponses },
  },
}) => {
  const calculation = Object.values(BulbTypes).reduceRight((_calculation, bulbCode) => {
    return Object.assign({}, { [bulbCode]: {} }, _calculation);
  }, {} as Calculation);
  let quantity = 0;

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

  // 1.2) Calculation light project
  const requirementIdForTypeOfRoom = '0102010000';
  const requirementIdForRoomArea = '0102020000';
  const requirementIdForQuantity = '0102030000';

  if (typeOfNeedResponses[0].requirement.id.slice(2, 4) === '02') {
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
      const bulbCode = _ as BulbTypes;
      const currentBulb = calculation[bulbCode];

      const calculationPower = lightRateLux / bulbsQuantity / techCharacteristics[bulbCode].lumPerWatt;

      currentBulb.power =
        techCharacteristics[bulbCode].availablePowers.find(
          (availablePower: number) => availablePower >= calculationPower
          // @TODO need clarification
        ) || techCharacteristics[bulbCode].availablePowers[techCharacteristics[bulbCode].availablePowers.length - 1];

      console.log(currentBulb.power);

      currentBulb.lum = calculationPower * techCharacteristics[bulbCode].lumPerWatt;

      currentBulb.pRef =
        currentBulb.lum >= 1300
          ? 0.07341 * currentBulb.lum
          : 0.88 * Math.sqrt(currentBulb.lum + 0.49 * currentBulb.lum);

      currentBulb.eei = +(currentBulb.power / currentBulb.pRef).toFixed(2);
    });
  }

  // 2) Type of lamps/fittings
  const bulbTypeNeed = requirementResponses.find(({ requirement: { id } }) => /^02/.test(id))?.value as BulbTypes;

  if (!bulbTypeNeed || typeof bulbTypeNeed !== 'string') {
    throw errorBuilder(400, `Not provided type of lamp.`);
  }

  const bulbTypeNeedIsPresent = items.some((item) => item.id === bulbTypeNeed);

  if (!bulbTypeNeedIsPresent) {
    throw errorBuilder(400, `Haven't item in category with id - ${bulbTypeNeed}.`);
  }

  const eeiOfBulbTypeNeed = calculation[bulbTypeNeed].eei;

  const availableBulbTypes = Object.keys(calculation).reduce((_availableBulbTypes, _) => {
    const bulbCode = _ as BulbTypes;

    if (calculation[bulbCode].eei <= eeiOfBulbTypeNeed) {
      return Object.assign({}, { [bulbCode]: calculation[bulbCode] }, _availableBulbTypes);
    } else {
      return _availableBulbTypes;
    }
  }, {} as Calculation);

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
      const bulbCode = _ as BulbTypes;

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
    const bulbCode = _ as BulbTypes;

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
    const bulbCode = _ as BulbTypes;

    availableBulbTypes[bulbCode].eeClass = calculateEnergyEfficiencyClass(availableBulbTypes[bulbCode].eei);
  });

  const availableVariants: AvailableVariant[] = Object.keys(availableBulbTypes).map((_) => {
    const bulbCode = _ as BulbTypes;
    const currentBulb = availableBulbTypes[bulbCode];

    const metrics = [];

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
          id: '0202',
          notes: 'Клас енергоефективності',
          measure: currentBulb.eeClass,
        },
      ],
    });

    if (currentBulb.energyEconomy) {
      const observations = [];

      observations.push({
        id: '0301',
        notes: 'Економія електроенергії',
        measure: currentBulb.energyEconomy,
        unit: {
          id: '332',
          name: 'кВт*год',
        },
      });

      if (currentBulb.energyEconomy) {
        observations.push({
          id: '0302',
          notes: 'Фінансова економія',
          value: {
            amount: (currentBulb.financeEconomy as number) ?? 'Інформацію не представлено',
            currency: currentBulb.financeEconomy ? ('грн' as 'UAH') : ('' as 'UAH'),
          },
        });
      }
      metrics.push({
        id: '0300',
        title: 'Економічні показники',
        observations,
      });
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
    };
  });

  return {
    category: id,
    version,
    availableVariants: [
      availableVariants.find((variant) => variant.relatedItem === bulbTypeNeed) as AvailableVariant,
      ...availableVariants
        .filter((variant) => variant.relatedItem !== bulbTypeNeed)
        .sort((variantA, variantB) => {
          return (
            (variantA.metrics[1].observations[0].measure as number) -
            (variantB.metrics[1].observations[0].measure as number)
          );
        }),
    ],
  };
};

export default LightingEquipmentAndElectricLamps;
