import LightingEquipmentAndElectricLamps from './31500000-1';

import type { SpecificationEngine } from '../types';

const algorithmsMap: {
  [cpvCode: string]: SpecificationEngine;
} = {
  '31500000-1': LightingEquipmentAndElectricLamps,
};

export default algorithmsMap;
