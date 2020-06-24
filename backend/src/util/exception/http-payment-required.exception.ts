import { HttpException } from '@nestjs/common';

export class HttpPaymentRequiredException
  extends HttpException {
  constructor() {
    super('Payment required Exception', 402);
  }
}
