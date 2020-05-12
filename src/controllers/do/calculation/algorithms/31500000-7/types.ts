export enum BulbTypes {
  Incandescent = '31511000-1',
  Fluorescent = '31514000-2',
  Halogen = '31512000-8',
  LED = '31512341-2',
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
    modeOfUseLifetime: number;
    energyEconomy: number | undefined;
    financeEconomy: number | undefined;
    eeClass: string;
  };
};
