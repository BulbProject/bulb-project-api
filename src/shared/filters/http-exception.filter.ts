import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse() as { message?: string | string[]; error?: string };
    const messages = responseBody.message || responseBody.error;

    response.status(status).send({
      messages: typeof messages === 'string' ? [messages] : messages,
    });
  }
}
