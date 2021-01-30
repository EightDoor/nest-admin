import { Controller, Get } from '@nestjs/common';
import { SysUser } from './user.entity';
import { UserService } from './user.service';
import { Logger } from 'nestjs-pino';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private logger: Logger) { }

  @Get("test")
  async Test(): Promise<SysUser[]> {
    this.logger.warn("test")
    return await this.userService.findAll();
  }
}
