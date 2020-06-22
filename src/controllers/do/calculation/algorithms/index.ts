import LightingEquipmentAndElectricLamps from './31500000-1';

import type { CalculationEngine } from '../types';

const algorithmsMap: {
  [cpvCode: string]: CalculationEngine;
} = {
  '31500000-1': LightingEquipmentAndElectricLamps,
};

export default algorithmsMap;
