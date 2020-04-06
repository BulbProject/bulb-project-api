type Items = Record<string, any>;

interface ArrayProps {
  title?: string;
  description?: string;
  items: Items;
  contains?: object;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

export const array = (args: ArrayProps) => {
  return {
    type: 'array',
    ...args,
  };
};
