export type Period = PeriodInDays | PeriodConstrained;

interface PeriodBase {
  /**
   * The duration of the period reflected in ISO format.
   */
  duration: string;
  /**
   * The maximum duration of this period in days.
   * Where a start and end date are given, this field is optional,
   * and should reflect the difference between those two days.
   */
  durationInDays?: number;
  /**
   * The start date for the period.
   */
  startDate?: string;
  /**
   * The end date for the period.
   */
  endDate?: string;
  /**
   * The period cannot be extended beyond this date.
   */
  maxExtentDate?: string;
}

interface PeriodInDays extends PeriodBase {
  startDate?: never;
  endDate?: never;
  durationInDays: number;
}

interface PeriodConstrained extends PeriodBase {
  startDate: string;
  endDate: string;
  durationInDays?: number;
}
