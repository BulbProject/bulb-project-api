export interface Classification {
  /**
   * The classification code drawn from the selected scheme.
   */
  id: string | number;
  /**
   * A textual description or title for the code.
   */
  description?: string;
  /**
   * Classification should be drawn from an existing scheme or list of codes.
   * This field is used to indicate the scheme/codelist from which the classification is drawn.
   */
  scheme?: string;
  /**
   * A URI to identify the code. In the event individual URIs are not available for items in the identifier scheme
   * this value should be left blank.
   */
  uri?: string;
}
