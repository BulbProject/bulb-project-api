import fastify from 'fastify';
import atob from 'atob';

import { manageCred } from 'config';

interface Credentials {
  username: string;
  password: string;
}

const parseAuthorizationHeader = (authorization: string): string => {
  const [parsedAuthorization] = authorization.match(/(?<=Basic )(.+)/) || [];

  if (!parsedAuthorization?.length) {
    throw 'Incorrect Authorization header format.';
  }

  return parsedAuthorization;
};

const decodeCredentials = (credentials: string): Credentials => {
  const [username, password] = atob(credentials).split(':');

  return {
    username,
    password,
  };
};

const validateCredentials = ({ username, password }: Credentials): void => {
  if (manageCred.username !== username || manageCred.password !== password) {
    throw 'Invalid credentials provided.';
  }
};

const handleAuthorization: fastify.FastifyMiddleware<
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  { authorization: string }
> = async (req, reply) => {
  if (!req.headers?.authorization) {
    return reply
      .code(401)
      .header('WWW-Authenticate', 'Basic realm="Bulb Project API Manager"')
      .send();
  }

  try {
    const headerCredentials = parseAuthorizationHeader(req.headers.authorization);

    const credentials = decodeCredentials(headerCredentials);

    validateCredentials(credentials);
  } catch (e) {
    return reply.code(403).send(e.message || e);
  }
};

export default handleAuthorization;
