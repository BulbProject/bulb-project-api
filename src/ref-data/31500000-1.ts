export enum BulbVariants {
  Incandescent = '31519100-8',
  Halogen = '31512000-8',
  Fluorescent = '31532900-3',
  LED = '31712341-2',
}

const techChars = {
  [BulbVariants.Incandescent]: {
    lumPerWatt: 15,
    timeRate: 1375,
    availablePowers: [30, 40, 60, 80, 100, 120, 200],
  },
  [BulbVariants.Halogen]: {
    lumPerWatt: 20,
    timeRate: 3000,
    availablePowers: [3, 7, 10, 15, 20, 45, 60, 75],
  },
  [BulbVariants.Fluorescent]: {
    lumPerWatt: 60,
    timeRate: 30000,
    availablePowers: [30, 40, 60, 80, 100, 120, 200],
  },
  [BulbVariants.LED]: {
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

export default {
  techChars,
  calculateEnergyEfficiencyClass,
};
