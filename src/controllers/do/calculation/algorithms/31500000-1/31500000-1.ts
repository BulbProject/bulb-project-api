import errorBuilder from 'lib/error-builder';

import { weeksInYear } from 'ref-data';
import { Variants } from 'ref-data/31500000-1';

import {
  techChars,
  calculateEnergyEfficiencyClass,
  generateAvailableVariants,
  getDirectoryPower,
  getPowerRef,
  getValueFromResponses,
} from './utils';

import type { Option } from 'ts4ocds/extensions/options';
import type { CalculationEngine } from '../../types';
import type { Calculation } from './types';

// Name of the function is a name of current CPV code
const LightingEquipmentAndElectricLamps: CalculationEngine = ({
  category: { id, items, criteria, conversions },
  version,
  requestedNeed: { requirementResponses },
}) => {
  const calculationDraft = Object.values(Variants).reduce((_calculation, bulbCode: Variants) => {
    return {
      ..._calculation,
      [bulbCode]: {},
    };
  }, {} as Calculation);

  const selectedBulbType = requirementResponses.find(({ requirement: { id } }) => /^02/.test(id))?.value as Variants;

  if (!selectedBulbType || typeof selectedBulbType !== 'string') {
    throw errorBuilder(400, `Incorrect lamp type was provided.`);
  }

  const bulbTypeNeedIsPresent = items.some((item) => item.id === selectedBulbType);

  if (!bulbTypeNeedIsPresent) {
    throw errorBuilder(400, `Provided bulb type - '${selectedBulbType}' not in category items.`);
  }

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

  // 1.1) Calculation specific bulb
  if (typeOfNeedResponses[0].requirement.id.slice(2, 4) === '01') {
    const requirementIdForBulbPower = '0101010000';
    const requirementIdForBulbQuantity = '0101020000';

    const providedPower = getValueFromResponses(typeOfNeedResponses, requirementIdForBulbPower);

    if (typeof providedPower !== 'number' || providedPower <= 0) {
      throw errorBuilder(400, `Not provides correct value for bulb power for calculation concrete bulb.`);
    }

    const directoryPower = getDirectoryPower(selectedBulbType, providedPower);

    const lumPerWatt = directoryPower * techChars[selectedBulbType].lumPerWatt;

    const providedQuantity = getValueFromResponses(typeOfNeedResponses, requirementIdForBulbQuantity);

    if (typeof providedQuantity !== 'number' || providedPower <= 0) {
      throw errorBuilder(400, `Not provides correct value for bulbs quantity for calculationDraft concrete bulb.`);
    }

    (Object.keys(calculationDraft) as Variants[]).forEach((bulbType) => {
      const currentBulb = calculationDraft[bulbType];

      currentBulb.quantity = providedQuantity;

      if (bulbType !== selectedBulbType) {
        currentBulb.power = getDirectoryPower(bulbType, lumPerWatt / techChars[bulbType].lumPerWatt);
      } else {
        currentBulb.power = directoryPower;
      }

      currentBulb.lum = currentBulb.power * techChars[bulbType].lumPerWatt;
      currentBulb.pRef = getPowerRef(currentBulb.lum);
      currentBulb.eei = +(currentBulb.power / currentBulb.pRef).toFixed(2);
    });
  }

  // 1.2) Calculation light project
  if (typeOfNeedResponses[0].requirement.id.slice(2, 4) === '02') {
    const requirementIdForTypeOfRoom = '0102010000';
    const requirementIdForRoomArea = '0102020000';
    const requirementIdForQuantity = '0102030000';

    const typeOfRoom = getValueFromResponses(typeOfNeedResponses, requirementIdForTypeOfRoom);

    if (!typeOfRoom || typeof typeOfRoom !== 'string') {
      throw errorBuilder(400, `Not provided correct value for type of room for calculation light project.`);
    }

    const lightRateInLum = conversions
      .find(({ relatedItem }) => relatedItem === requirementIdForTypeOfRoom)
      // @TODO Need fix coefficient.value type, must be string | number | boolean
      ?.coefficients?.find(({ value }) => ((value as unknown) as string) === typeOfRoom)?.coefficient;

    if (!lightRateInLum) {
      throw errorBuilder(400, `Can't find lumen value for this type of room - ${typeOfRoom}.`);
    }

    const roomArea = getValueFromResponses(typeOfNeedResponses, requirementIdForRoomArea);

    if (!roomArea || typeof roomArea !== 'number' || roomArea <= 0) {
      throw errorBuilder(400, `Not provides correct value for room area for calculation light project.`);
    }

    const bulbsQuantity = getValueFromResponses(typeOfNeedResponses, requirementIdForQuantity);

    if (!bulbsQuantity || typeof bulbsQuantity !== 'number' || bulbsQuantity <= 0) {
      throw errorBuilder(400, `Not provided correct value for bulbs quantity for calculation light project.`);
    }

    const lightRateLux = lightRateInLum * roomArea;

    (Object.keys(calculationDraft) as Variants[]).forEach((bulbType) => {
      const currentBulb = calculationDraft[bulbType];

      const calculationPower = lightRateLux / bulbsQuantity / techChars[bulbType].lumPerWatt;

      currentBulb.quantity = bulbsQuantity;
      currentBulb.power = getDirectoryPower(bulbType, calculationPower);
      currentBulb.lum = currentBulb.power * techChars[bulbType].lumPerWatt;
      currentBulb.pRef = getPowerRef(currentBulb.lum);
      currentBulb.eei = +(currentBulb.power / currentBulb.pRef).toFixed(2);
    });
  }

  // 1.3) Calculation custom light project
  if (typeOfNeedResponses[0].requirement.id.slice(2, 4) === '03') {
    const requirementIdForRoomArea = '0103010000';
    const requirementIdForLightLevel = '0103020000';
    const requirementIdForQuantity = '0103030000';

    const roomArea = getValueFromResponses(typeOfNeedResponses, requirementIdForRoomArea);

    if (!roomArea || typeof roomArea !== 'number' || roomArea <= 0) {
      throw errorBuilder(400, `Not provides correct value for room area for calculation custom light project.`);
    }

    const lightLevel = getValueFromResponses(typeOfNeedResponses, requirementIdForLightLevel);

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

    const bulbsQuantity = getValueFromResponses(typeOfNeedResponses, requirementIdForQuantity);

    if (!bulbsQuantity || typeof bulbsQuantity !== 'number' || bulbsQuantity <= 0) {
      throw errorBuilder(400, `Not provided correct value for bulbs quantity for calculation light project.`);
    }

    const lightRateLux = lightRateInLum * roomArea;

    (Object.keys(calculationDraft) as Variants[]).forEach((bulbType) => {
      const currentBulb = calculationDraft[bulbType];

      const calculationPower = lightRateLux / bulbsQuantity / techChars[bulbType].lumPerWatt;

      currentBulb.quantity = bulbsQuantity;
      currentBulb.power = getDirectoryPower(bulbType, calculationPower);
      currentBulb.lum = currentBulb.power * techChars[bulbType].lumPerWatt;
      currentBulb.pRef = getPowerRef(currentBulb.lum);
      currentBulb.eei = +(currentBulb.power / currentBulb.pRef).toFixed(2);
    });
  }

  // 2) Selecting more effective bulbs
  const eeiOfBulbTypeNeed = calculationDraft[selectedBulbType].eei;

  const availableBulbTypes = (Object.keys(calculationDraft) as Variants[]).reduce(
    (_availableBulbTypes, bulbType: Variants) => {
      if (calculationDraft[bulbType].eei <= eeiOfBulbTypeNeed) {
        const requirementGroups = criteria.flatMap((criterion) => criterion.requirementGroups);
        const bulbTypeRequirementGroup = requirementGroups.find((requirementGroup) => {
          return (
            requirementGroup.id ===
            requirementResponses
              .find(({ requirement: { id } }) => /^02/.test(id))
              ?.requirement.id?.replace(/[0-9]{6}$/, '000000')
          );
        });

        // @TODO need fix OptionDetails union type in ts4ocds
        // @ts-ignore
        const bulbTypes = bulbTypeRequirementGroup?.requirements[0]?.optionDetails?.optionGroups[0].options.flatMap(
          (option: Option) => option.value
        );

        if (!bulbTypes.find((categoryBulbType: string) => categoryBulbType === bulbType)) {
          return _availableBulbTypes;
        }

        return {
          ..._availableBulbTypes,
          [bulbType]: calculationDraft[bulbType],
        };
      } else {
        return _availableBulbTypes;
      }
    },
    {} as Calculation
  );

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
    const hoursInDay = modeOfUseResponses[0].value as unknown;
    const daysInWeek = modeOfUseResponses[1].value as unknown;

    if (typeof hoursInDay !== 'number' || (hoursInDay <= 0 && hoursInDay > 24)) {
      throw errorBuilder(400, 'Incorrect provided working hours per day.');
    }

    if (typeof daysInWeek !== 'number' || (daysInWeek <= 0 && daysInWeek > 7)) {
      throw errorBuilder(400, 'Incorrect provided working days per week.');
    }

    (Object.keys(availableBulbTypes) as Variants[]).forEach((bulbType) => {
      const workingHoursInWeek = (hoursInDay as number) * (daysInWeek as number);
      const workingHoursInYear = workingHoursInWeek * weeksInYear;

      availableBulbTypes[bulbType].workingHoursInYear = workingHoursInYear;
      availableBulbTypes[bulbType].modeOfUseLifetime = +(techChars[bulbType].timeRate / workingHoursInYear).toFixed(2);
    });
  }

  // 4) Economy
  const tariffsRequirements = requirementResponses.filter(({ requirement: { id } }) => /^04/.test(id));

  if (tariffsRequirements.length !== 1) {
    throw errorBuilder(400, `Not correct provided information about tariffs.`);
  }

  (Object.keys(availableBulbTypes) as Variants[]).forEach((bulbType) => {
    const { quantity, power, workingHoursInYear } = availableBulbTypes[bulbType];

    if (workingHoursInYear) {
      availableBulbTypes[bulbType].energyEconomy =
        ((availableBulbTypes[selectedBulbType].power * quantity - power * quantity) * workingHoursInYear) / 1000;

      const tariff = tariffsRequirements[0].value;

      if (typeof tariff === 'number' && tariff > 0) {
        const summaryElectricPrice = (power: number) => power * 0.001 * quantity * tariff;

        availableBulbTypes[bulbType].financeEconomy = +(
          (summaryElectricPrice(availableBulbTypes[selectedBulbType].power) - summaryElectricPrice(power)) *
          workingHoursInYear
        ).toFixed(2);
      }
    }
  });

  // 5) Efficiency
  (Object.keys(availableBulbTypes) as Variants[]).forEach((bulbType) => {
    availableBulbTypes[bulbType].eeClass = calculateEnergyEfficiencyClass(availableBulbTypes[bulbType].eei);
  });

  return {
    category: id,
    version,
    availableVariants: generateAvailableVariants(availableBulbTypes, selectedBulbType),
  };
};

export default LightingEquipmentAndElectricLamps;
