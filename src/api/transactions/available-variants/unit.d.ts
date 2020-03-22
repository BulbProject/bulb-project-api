import { Value } from './value';

export interface Unit {
  id?: string;
  name?: string;
  scheme?: string;
  uri?: string;
  value: Value;
}
