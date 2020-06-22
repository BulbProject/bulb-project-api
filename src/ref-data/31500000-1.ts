export enum Variants {
  Incandescent = '31519100-8',
  Halogen = '31512000-8',
  Fluorescent = '31532900-3',
  LED = '31712341-2',
}

export type TechCharacteristics = {
  [key in Variants]: {
    lumPerWatt: number;
    timeRate: number;
    availablePowers: number[];
  };
};

const calculateEnergyEfficiencyClass = (eei: number): string => {
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
  calculateEnergyEfficiencyClass,
};
