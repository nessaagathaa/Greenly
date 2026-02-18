import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError } from '../errors/app.error';

interface HttpExceptionResponse {
  message?: string | string[];
  errors?: unknown;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal Server Error';
    let errors: unknown = null;

    if (exception instanceof AppError) {
      status = exception.statusCode;
      message = exception.message;
      errors = exception.errors ?? null;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse =
        exception.getResponse() as HttpExceptionResponse;

      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse?.message?.toString() ?? exception.message;

      errors =
        typeof exceptionResponse === 'object'
          ? exceptionResponse.errors ?? null
          : null;
    }

    response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      message,
      errors,
      timestamp: new Date().toISOString(),
    });
  }
}
