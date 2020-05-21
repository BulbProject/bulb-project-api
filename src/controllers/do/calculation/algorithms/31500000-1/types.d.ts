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
