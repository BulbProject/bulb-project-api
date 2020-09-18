import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  public catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<FastifyReply>();
    const status = exception.getStatus();
    const responseBody = exception.getResponse() as { message?: string | string[]; error?: string };
    const messages = typeof responseBody !== 'string' ? responseBody.message || responseBody.error : responseBody;

    response.status(status).send({
      messages: typeof messages === 'string' ? [messages] : messages,
    });
  }
}
