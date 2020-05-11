import errorBuilder from 'lib/error-builder';

import type { AlgorithmEngine } from 'types/algorithm-engine';
import { AvailableVariant } from '../../../../types/transactions/available-variants';

const weeksInYear = 52;

const calculateEnergyEfficiencyClass = (eei: number) => {
  if (eei <= 0.13) {
    return 'A++';
  } else if (eei > 0.13 && eei <= 0.18) {
    return 'A+';
  } else if (eei > 0.18 && eei <= 0.4) {
    return 'A';
  } else if (eei > 0.4 && eei <= 0.95) {
    return 'B';
  } else if (eei > 0.95 && eei <= 1.2) {
    return 'C';
  } else if (eei > 1.2 && eei <= 1.75) {
    return 'D';
  } else {
    return 'E';
  }
};

type BulbType = '31511000-1' | '31512000-8' | '31514000-2' | '31512341-2';

interface BulbTechnicalCharacteristic {
  lumPerWatt: number;
  timeRate: number;
  availablePowers: number[];
}

interface BulbsTechnicalCharacteristic {
  '31511000-1': BulbTechnicalCharacteristic;
  '31512000-8': BulbTechnicalCharacteristic;
  '31514000-2': BulbTechnicalCharacteristic;
  '31512341-2': BulbTechnicalCharacteristic;
}

const bulbsTechnicalCharacteristics: BulbsTechnicalCharacteristic = {
  '31511000-1': {
    lumPerWatt: 15,
    timeRate: 1375,
    availablePowers: [30, 40, 60, 80, 100, 120, 200],
  },
  '31512000-8': {
    lumPerWatt: 20,
    timeRate: 30000,
    availablePowers: [30, 40, 60, 80, 100, 120, 200],
  },
  '31514000-2': {
    lumPerWatt: 60,
    timeRate: 3000,
    availablePowers: [3, 7, 10, 15, 20, 45, 60, 75],
  },
  '31512341-2': {
    lumPerWatt: 90,
    timeRate: 42000,
    availablePowers: [3, 7, 10, 15, 20, 45, 60, 75],
  },
};

type CalculationForBulbTypes = {
  [bulb in BulbType]: {
    power: number;
    lum: number;
    pRef: number;
    eei: number;
  };
};

// Name of the function is a name of current CPV code
//@ts-ignore
const LightingEquipmentAndElectricLamps: AlgorithmEngine = ({
  category,
  version,
  requestedNeed: { requestedNeed },
}) => {
  const calculationForBulbTypes: CalculationForBulbTypes = {
    '31511000-1': {},
    '31512000-8': {},
    '31514000-2': {},
    '31512341-2': {},
  } as CalculationForBulbTypes;
  let quantity = 0;

  // 1) Type of need
  const typeOfNeedRequirements = requestedNeed.requirementResponses.filter(({ requirement: { id } }) => {
    return /^01/.test(id);
  });

  const typeOfNeedRequirementsIsConsistent = typeOfNeedRequirements.every(({ requirement: { id } }) => {
    return id.slice(2, 4) === typeOfNeedRequirements[0].requirement.id.slice(2, 4);
  });

  if (!typeOfNeedRequirementsIsConsistent) {
    throw errorBuilder(
      400,
      `For type of need criterion, requirement responses are given from different requirement groups`
    );
  }

  // 1.2) Calculation light project
  if (typeOfNeedRequirements[0].requirement.id.slice(2, 4) === '02') {
    const typeOfRoom = typeOfNeedRequirements.find(({ requirement: { id } }) => id === '0102010000')?.value as
      | string
      | undefined;

    if (!typeOfRoom) {
      throw errorBuilder(400, `Not provide type of room for calculation light project`);
    }

    const coefficientInLum = category.conversions
      .find((conversion) => conversion.relatedItem === '0102010000')
      //@ts-ignore @TODO Need fix coefficient.value type, must be string | number | boolean
      ?.coefficients?.find((coefficient) => (coefficient.value as string) === typeOfRoom)?.coefficient;

    const area = typeOfNeedRequirements.find(({ requirement: { id } }) => id === '0102020000')?.value;

    if (!area) {
      throw errorBuilder(400, `Not provide room area for calculation light project`);
    }

    const lightDots = typeOfNeedRequirements.find(({ requirement: { id } }) => id === '0102030000')?.value as
      | number
      | undefined;

    if (!lightDots) {
      throw errorBuilder(400, `Not provide light dots for calculation light project`);
    }

    quantity = lightDots;

    const coefficientInLux = (coefficientInLum as number) * (area as number);

    Object.keys(calculationForBulbTypes).forEach((bulb) => {
      const currentBulb = calculationForBulbTypes[bulb as BulbType];

      const calculationPower =
        // @ts-ignore
        coefficientInLux / lightDots / bulbsTechnicalCharacteristics[bulb as BulbType].lumPerWatt;

      // @ts-ignore
      currentBulb.power = bulbsTechnicalCharacteristics[bulb as BulbType].availablePowers.find(
        (availablePower: number) => availablePower >= calculationPower
      );

      // @ts-ignore
      currentBulb.lum = calculationPower * bulbsTechnicalCharacteristics[bulb as BulbType].lumPerWatt;

      currentBulb.pRef =
        currentBulb.lum >= 1300
          ? 0.07341 * currentBulb.lum
          : 0.88 * Math.sqrt(currentBulb.lum + 0.49 * currentBulb.lum);

      currentBulb.eei = currentBulb.power / currentBulb.pRef;
    });

    console.log(calculationForBulbTypes);
  }

  // 2) Type of lamps/fittings
  const bulbTypeNeed = requestedNeed.requirementResponses.find(({ requirement: { id } }) => {
    return /^02/.test(id);
  })?.value;

  if (!bulbTypeNeed) {
    throw errorBuilder(400, `Not provide type of lamp for calculation light project`);
  }

  const bulbTypeNeedIsPresent = category.items.some((item) => item.id === bulbTypeNeed);

  if (!bulbTypeNeedIsPresent) {
    throw errorBuilder(400, `Haven't item in category with id - ${bulbTypeNeed}`);
  }

  const eeiOfBulbTypeNeed = calculationForBulbTypes[bulbTypeNeed as BulbType].eei;

  const availableBulbTypes = Object.keys(calculationForBulbTypes).reduce((acc, bulb) => {
    if (calculationForBulbTypes[bulb as BulbType].eei <= eeiOfBulbTypeNeed) {
      return Object.assign({}, { [bulb]: calculationForBulbTypes[bulb as BulbType] }, acc);
    } else {
      return acc;
    }
  }, {});

  // 3) Bulb lifetime
  const modeOfUseRequirements = requestedNeed.requirementResponses.filter(({ requirement: { id } }) => {
    return /^03/.test(id);
  });

  if (!modeOfUseRequirements.length) {
    throw errorBuilder(400, `Haven't mode of use`);
  }

  const modeOfUseRequirementsIsConsistent = modeOfUseRequirements.every(({ requirement: { id } }) => {
    return id.slice(2, 4) === modeOfUseRequirements[0].requirement.id.slice(2, 4);
  });

  if (!modeOfUseRequirementsIsConsistent) {
    throw errorBuilder(
      400,
      `For mode of use criterion, requirement responses are given from different requirement groups`
    );
  }

  if (modeOfUseRequirements[0].requirement.id.slice(2, 4) === '01') {
    Object.keys(availableBulbTypes).forEach((bulb) => {
      const workingHoursInWeek = modeOfUseRequirements.reduce((acc, requirementResponse) => {
        return acc * (requirementResponse.value as number);
      }, 1);

      //@ts-ignore
      availableBulbTypes[bulb].lifetime =
        bulbsTechnicalCharacteristics[bulb as BulbType].timeRate / (workingHoursInWeek * weeksInYear);
    });
  }

  // 4) Economy
  const tariffsRequirements = requestedNeed.requirementResponses.filter(({ requirement: { id } }) => {
    return /^04/.test(id);
  });

  if (tariffsRequirements.length !== 1) {
    throw errorBuilder(400, `Not correct provide information about tariffs`);
  }

  Object.keys(availableBulbTypes).forEach((bulb) => {
    //@ts-ignore
    availableBulbTypes[bulb as BulbType].energyEconomy =
      //@ts-ignore
      availableBulbTypes[bulbTypeNeed].power - availableBulbTypes[bulb].power;

    //@ts-ignore
    availableBulbTypes[bulb].financicEconomy =
      //@ts-ignore
      availableBulbTypes[bulbTypeNeed].power * quantity * tariffsRequirements[0].value * 0.001 -
      //@ts-ignore
      availableBulbTypes[bulb].power * quantity * tariffsRequirements[0].value * 0.001;
  });

  // 5) Efficiency
  Object.keys(availableBulbTypes).forEach((bulb) => {
    //@ts-ignore
    availableBulbTypes[bulb].eeClass = calculateEnergyEfficiencyClass(availableBulbTypes[bulb].eei);
  });

  // return availableBulbTypes;

  const availableVariants: AvailableVariant[] = Object.keys(availableBulbTypes).reduce(
    (acc: AvailableVariant[], bulb) => {
      //@ts-ignore
      const currentBulb = availableBulbTypes[bulb];

      return [
        ...acc,
        {
          id: Math.random().toString(),
          relatedItem: bulb,
          quantity,
          metrics: [
            {
              id: '0100',
              title: 'Технічні показники',
              observations: [
                {
                  id: '0101',
                  notes: 'Потужність',
                  measure: currentBulb.power,
                  unit: {
                    id: '1',
                    name: 'Вт',
                  },
                },
                {
                  id: '0102',
                  notes: 'Термін експлуатації',
                  //@ts-ignore
                  measure: bulbsTechnicalCharacteristics[bulb].timeRate,
                  unit: {
                    id: '2',
                    name: 'Год',
                  },
                },
              ],
            },
            {
              id: '0200',
              title: 'Економічні показники',
              observations: [
                {
                  id: '0201',
                  notes: 'Економія електроенергії',
                  measure: currentBulb.energyEconomy ?? 'Немає інформації',
                  unit: {
                    id: '3',
                    name: 'Кв/год',
                  },
                },
                {
                  id: '0202',
                  notes: 'Фінансова економія',
                  value: currentBulb.financicEconomy ?? 'Немає інформації',
                  unit: {
                    id: '4',
                    name: 'грн',
                  },
                },
              ],
            },
            {
              id: '04',
              title: 'Показники енергоефективності',
              observations: [
                {
                  id: '0401',
                  notes: 'Індекс енергоефективності',
                  measure: currentBulb.eei,
                },
                {
                  id: '0402',
                  notes: 'Клас енергоефективності',
                  measure: currentBulb.eeClass,
                },
              ],
            },
          ],
          avgValue: {
            amount: 0,
            currency: 'UAH',
          },
          relatedProducts: ['https://prozorro.gov.ua/ProzorroMarket'],
        },
      ];
    },
    []
  );

  return {
    category: category.id,
    version,
    availableVariants: [
      availableVariants.find((variant) => variant.relatedItem === bulbTypeNeed),
      ...availableVariants
        .filter((variant) => variant.relatedItem !== bulbTypeNeed)
        .sort((bulbA, bulbB) => {
          return (
            (bulbA.metrics[2].observations[0].measure as number) - (bulbB.metrics[2].observations[0].measure as number)
          );
        }),
    ],
  };
};

export default LightingEquipmentAndElectricLamps;
