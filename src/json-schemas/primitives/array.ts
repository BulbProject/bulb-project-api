type Items = Record<string, any>;

interface ArrayProps {
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
