import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'nestjs-pino';
import config from 'src/config';
import { UserService } from 'src/core/sys/user/user.service';
import utils from 'src/utils';
import { SysRoleMenu } from '../sys/role/roleMenu.entity';
import { SysUser } from '../sys/user/user.entity';
import { SysUserRole } from '../sys/user/userRole.entity';


export interface ReToken {
  access_token: string;
  expiresIn: string;
}
export interface Payload {
  username: string;
  userId: number;
  roles?: SysUserRole[];
  menus?: SysRoleMenu[]
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<SysUser | null> {
    const user = await this.userService.findOne({
      where: {
        account: username,
        passWord: utils.PasswordEncryPtion(password),
      },
    });
    if (user?.id) {
      return user;
    }
    return null;
  }

  async login(user:SysUser ): Promise<ReToken> {
    const payload: Payload = { username: user.account, userId: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: config.expiresIn
    }
  }
}
