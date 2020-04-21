import { TypedRequestHandler } from 'types/request-data';

export const calculation: TypedRequestHandler<{ categoryId: string; version: string }> = async ({
  body,
  params: { categoryId, version },
}) => {
  return {
    HELLO: 'WORLD',
    requestInfo: {
      params: {
        categoryId,
        version,
      },
      body,
    },
  };
};
