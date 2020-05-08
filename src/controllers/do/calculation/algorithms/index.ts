import LightingEquipmentAndElectricLamps from './31500000-7';

import type { AlgorithmEngine } from 'types/algorithmEngine';

const algorithmsMap: {
  [cpvCode: string]: AlgorithmEngine;
} = {
  '31500000-7': LightingEquipmentAndElectricLamps,
};

export default algorithmsMap;
