type MixedType = 'string' | 'number' | 'integer' | 'boolean';

export const mixed = ({ type, title, description }: { type: MixedType[]; title?: string; description?: string }) => ({
  title,
  description,
  type,
});
