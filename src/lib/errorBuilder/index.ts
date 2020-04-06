export default function(statusCode: number, message: string) {
  const error = new Error();
  // @ts-ignore
  error.statusCode = statusCode;
  error.message = message;

  return error;
}
