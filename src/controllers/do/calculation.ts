import { RequestHandler } from 'fastify';

export const calculation: RequestHandler = async () => {
  return { HELLO: 'WORLD' };
};
