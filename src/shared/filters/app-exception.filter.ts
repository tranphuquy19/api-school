import { Injectable, Inject } from '@nestjs/common';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
@Catch()
export class AppExceptionFilter implements ExceptionFilter {

  async catch(exception: HttpException | Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode: number;
    let data: any;
    let auxData: any;
    if (exception instanceof HttpException) {
      const exep = exception as HttpException;
      statusCode = exep.getStatus();
      auxData = exep.message;
      if(auxData.details == undefined || auxData.details == null){
        data = auxData;
      }
    } else {
      const exep = exception as Error;
      statusCode = 500;
      data = {
        description: 'Error inesperado en School api',
      };
    }

    response
      .status(statusCode)
      .json({
        statusCode,
        error: true,
        path: request.url,
        timestamp: new Date(),
        data,
      });
  }
}
