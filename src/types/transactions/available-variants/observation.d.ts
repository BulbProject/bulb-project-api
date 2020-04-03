import { Observation as OCDSObservation } from 'ts4ocds/extensions/metrics';
import { Period } from '../../data';
import { Unit } from './unit';
import { Value } from './value';

export type Observation = Omit<OCDSObservation, 'relatedImplementationMilestone'> & {
  period?: Period;
  unit: Unit;
  value: Value;
};
