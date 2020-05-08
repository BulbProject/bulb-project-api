import type { RequestHandler } from 'fastify';

export type TypedRequestHandler<
  PathParams,
  Payload = undefined,
  QueryParams = undefined,
  Headers = undefined
> = RequestHandler<unknown, unknown, QueryParams, PathParams, Headers, Payload>;
