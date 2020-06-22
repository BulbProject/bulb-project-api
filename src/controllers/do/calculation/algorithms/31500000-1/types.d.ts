import { Variants } from 'ref-data/31500000-1';

export type Calculation = {
  [key in Variants]: {
    quantity: number;
    power: number;
    lum: number;
    pRef: number;
    eei: number;
    eeClass: string;
    modeOfUseLifetime?: number;
    workingHoursInYear?: number;
    energyEconomy?: number;
    financeEconomy?: number;
  };
};
