import { BulbTypes, TechCharacteristics } from './types';

export const weeksInYear = 52;

export const techCharacteristics: TechCharacteristics = {
  [BulbTypes.Incandescent]: {
    lumPerWatt: 15,
    timeRate: 1375,
    availablePowers: [30, 40, 60, 80, 100, 120, 200],
  },
  [BulbTypes.Halogen]: {
    lumPerWatt: 20,
    timeRate: 3000,
    availablePowers: [3, 7, 10, 15, 20, 45, 60, 75],
  },
  [BulbTypes.Fluorescent]: {
    lumPerWatt: 60,
    timeRate: 30000,
    availablePowers: [30, 40, 60, 80, 100, 120, 200],
  },
  [BulbTypes.LED]: {
    lumPerWatt: 90,
    timeRate: 42000,
    availablePowers: [3, 7, 10, 15, 20, 45, 60, 75],
  },
};

export const calculateEnergyEfficiencyClass = (eei: number) => {
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
