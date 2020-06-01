type MixedType = 'string' | 'number' | 'integer' | 'boolean';

export const mixed = (type: MixedType[], metaData?: { title?: string; description?: string }) => ({
  title: metaData?.title,
  description: metaData?.description,
  type,
});
