type format =
  | 'date-time'
  | 'time'
  | 'date'
  | 'email'
  | 'idn-email'
  | 'hostname'
  | 'idn-hostname'
  | 'ipv4'
  | 'uri'
  | 'uri-reference'
  | 'iri'
  | 'iri-reference'
  | 'uri-template'
  | 'json-pointer'
  | 'relative-json-pointer'
  | 'regex';

interface StringProps {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: format;
  enum: string[] | number[];
}

export const string = (args?: StringProps) => {
  return {
    type: 'string',
    ...args,
  };
};
