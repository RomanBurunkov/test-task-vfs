import { Catch, HttpException, HttpStatus } from '@nestjs/common';

const NOK = Symbol('Not OK message');

@Catch()
export class ExceptionFilter {
  constructor() {
    this[NOK] = 'nok';
  }

  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const code = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(code)
      .json({ status: this[NOK], result: exception.message });
  }
}
