import { Controller, Get, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('user')
export class UserController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

  @Get("test")
  public Test(): number {
    this.logger.info("test")
    return 123;
  }
}
