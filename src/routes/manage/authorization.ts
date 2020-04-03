import fastify from 'fastify';
import atob from 'atob';

import { managerCred } from 'config';

interface Credentials {
  username: string;
  password: string;
}

const parseAuthorizationHeader = (authorization: string): string => {
  const parsedAuthorization = authorization.match(/(?<=Basic )(.+)/);

  if (!parsedAuthorization?.length) {
    throw 'Incorrect Authorization header format.';
  }

  return parsedAuthorization[0];
};

const decodeCredentials = (credentials: string): Credentials => {
  const decodedArray = atob(credentials).split(':');

  return {
    username: decodedArray[0],
    password: decodedArray[1],
  };
};

const validateCredentials = ({ username, password }: Credentials): void => {
  if (managerCred.username !== username || managerCred.password !== password) {
    throw 'Invalid credentials provided.';
  }
};

const handleAuthorization: fastify.FastifyMiddleware = async (req, reply, done) => {
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

    done();
  } catch (e) {
    return reply.code(403).send(e?.message || e);
  }
};

export default handleAuthorization;
