import fastify from 'fastify';

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
    if (process.env[`CRED_${credential.toUpperCase()}`] !== value) {
      throw `Invalid ${credential}.`;
    }
  };

  return Object.keys(credentials).forEach(credential =>
    validateCredentialParameter(credential, credentials[credential as keyof Credentials])
  );
};

const handleAuthentication: fastify.FastifyMiddleware = (req, reply, done) => {
  if (!req.headers.Authorization) {
    reply.code(401).header('WWW-Authenticate', 'Basic realm="Bulb Project API Manager"');
  }

  try {
    const headerCredentials = parseAuthorizationHeader(req.headers.Authorization);

    const credentials = decodeCredentials(headerCredentials);

    validateCredentials(credentials);

    done();
  } catch (e) {
    reply.code(403).send(e.message);
  }
};

interface Credentials {
  username: string;
  password: string;
}

export default handleAuthentication;
