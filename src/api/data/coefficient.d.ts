import { Period } from './period';

export interface Coefficient {
  /**
   * An identifier for this coefficient.
   */
  id: string | number;
  /**
   * Precise value that has to be applied for conversion in specific case.
   */
  coefficient?: number;
  /**
   * Indicative minimum value of related 'requirement' received through 'requirementResponse'.
   */
  minValue?: number;
  /**
   * 	Indicative maximum value of related 'requirement' received through 'requirementResponse'.
   */
  maxValue?: number;
  /**
   * Used to specify a particular period the conversion and its coefficients are applies to.
   */
  period: Period;
  /**
   * Value of related 'requirement' received through 'requirementResponse'.
   */
  value?: number;
}
