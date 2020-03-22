export interface Period {
  /**
   * The duration of the period reflected in ISO format.
   */
  duration: string;
  /**
   * The maximum duration of this period in days.
   * Where a start and end date are given, this field is optional,
   * and should reflect the difference between those two days.
   *
   * @ToDo: make a discriminated union.
   */
  durationInDays?: number;
  /**
   * The start date for the period
   */
  startDate?: string;
  /**
   * The end date for the period
   */
  endDate?: string;
  /**
   * The period cannot be extended beyond this date.
   */
  maxExtentDate?: string;
}
