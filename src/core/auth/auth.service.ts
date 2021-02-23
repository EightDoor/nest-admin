import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { UserService } from 'src/core/sys/user/user.service';
import utils from 'src/utils';
import { SysUser } from '../sys/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<SysUser | null> {
    const user = await this.userService.findOne({
      where: {
        username,
        password: utils.PasswordEncryPtion(password),
      },
    });
    this.logger.log(user);
    if (user?.id) {
      return user;
    }
    return null;
  }
}
