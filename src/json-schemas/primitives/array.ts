type Items = Record<string, any>;

interface ArrayProps {
  title?: string;
  description?: string;
  items: Items;
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
