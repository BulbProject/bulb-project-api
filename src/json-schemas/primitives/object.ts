interface Property {
  [key: string]: any;
}

interface ObjectProps {
  properties: object;
  required?: string[];
  propertyNames?: {
    pattern: string;
  };
  minProperties?: number;
  maxProperties?: number;
  dependencies?: Property;
  patternProperties?: Property;
}

export const object = (args: ObjectProps) => {
  return {
    type: 'object',
    ...args,
  };
};
