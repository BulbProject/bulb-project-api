class RequestError<D extends unknown | undefined = undefined> extends Error {
  constructor(public readonly statusCode: number, public readonly message: string, public readonly details?: D) {
    super();
  }
}

export default RequestError;
