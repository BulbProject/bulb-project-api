const mixedType = ['string', 'number', 'integer', 'boolean'] as const;
type MixedType = typeof mixedType[number];

export const mixed = (type: readonly MixedType[] = mixedType, metaData?: { title?: string; description?: string }) => ({
  title: metaData?.title,
  description: metaData?.description,
  type,
});
