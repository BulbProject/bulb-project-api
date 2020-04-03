import fastify from 'fastify';
import atob from 'atob';

import { managerCred } from 'config';

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

const validateCredentials = (credentials: Credentials): void => {
  const validateCredentialParameter = (credential: string, value: string): void => {
    if (managerCred[credential as keyof Credentials] !== value) {
      throw `Invalid credentials provided.`;
    }
  };

  return Object.keys(credentials).forEach(credential =>
    validateCredentialParameter(credential, credentials[credential as keyof Credentials])
  );
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

interface Credentials {
  username: string;
  password: string;
}

export default handleAuthorization;
