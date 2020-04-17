import { RequestHandler } from 'fastify';

export const calculation: RequestHandler<
  unknown,
  unknown,
  unknown,
  { categoryId: string; version: string },
  unknown,
  {}
> = async ({ body, params: { categoryId, version } }) => {
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
