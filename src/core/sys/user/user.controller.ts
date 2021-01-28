import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Logger } from 'nestjs-pino';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private logger: Logger) { }

  @Get("test")
  async Test(): Promise<User[]> {
    this.logger.warn("test")
    return await this.userService.findAll();
  }
}
