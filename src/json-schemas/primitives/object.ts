type Property = Record<string, any>;

interface ObjectProps {
  title?: string;
  description?: string;
  properties: Property;
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
