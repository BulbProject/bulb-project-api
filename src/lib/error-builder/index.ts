const errorBuilder = (statusCode: number, message: string) => {
  const error = new Error();
  // @ts-ignore
  error.statusCode = statusCode;
  error.message = message;

  return error;
};

export default errorBuilder;
