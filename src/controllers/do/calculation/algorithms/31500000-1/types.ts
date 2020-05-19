export enum BulbTypes {
  Incandescent = '31519100-8',
  Halogen = '31512000-8',
  Fluorescent = '31532900-3',
  LED = '31712341-2',
}

export type TechCharacteristics = {
  [bulb in BulbTypes]: {
    lumPerWatt: number;
    timeRate: number;
    availablePowers: number[];
  };
};

export type Calculation = {
  [bulb in BulbTypes]: {
    power: number;
    lum: number;
    pRef: number;
    eei: number;
    workingHoursInYear: number | undefined;
    modeOfUseLifetime: number;
    energyEconomy: number | undefined;
    financeEconomy: number | undefined;
    eeClass: string;
  };
};
