import LightingEquipmentAndElectricLamps from './31500000-1';

import type { AlgorithmEngine } from 'types/algorithm-engine';

const algorithmsMap: {
  [cpvCode: string]: AlgorithmEngine;
} = {
  '31500000-1': LightingEquipmentAndElectricLamps,
};

export default algorithmsMap;
