interface Item {
  [key: string]: any;
}

interface ArrayProps {
  items: Item;
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
