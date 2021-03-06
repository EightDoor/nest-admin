import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from 'nestjs-pino';
import config from 'src/config';
import { UserService } from 'src/core/sys/user/user.service';
import utils from 'src/utils';
import { SysRoleMenu } from '../sys/role/roleMenu.entity';
import { SysUser } from '../sys/user/user.entity';
import { SysUserRole } from '../sys/user/userRole.entity';
import { uniq as UniqLoda } from 'lodash';
import { SysRole } from '../sys/role/role.entity';
import { SysMenu } from '../sys/menu/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginEntiry } from './login.entity';

export interface ReToken {
  accessToken?: string;
  expiresIn?: string;
  msg: string;
}
export interface Payload {
  username?: string;
  userId?: number;
}
interface GetUserInfoR {
  roles: SysUserRole[];
  menus: SysRoleMenu[];
  userInfo: SysUser | undefined;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
    @InjectRepository(SysUserRole)
    private readonly repo: Repository<SysUserRole>,
    @InjectRepository(SysRoleMenu)
    private readonly menuRepo: Repository<SysRoleMenu>,
    @InjectRepository(SysRole)
    private readonly role: Repository<SysRole>,
    @InjectRepository(SysMenu)
    private readonly menu: Repository<SysMenu>,
    @InjectRepository(SysUser) private readonly userRepo: Repository<SysUser>,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<SysUser | null> {
    this.logger.debug(utils.PasswordEncryPtion(password));
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

  async login(body: LoginEntiry): Promise<ReToken> {
    const user = await this.userRepo
      .createQueryBuilder()
      .where('account = :account AND pass_word=:pass_word', {
        account: body.username,
        pass_word: utils.PasswordEncryPtion(body.password),
      })
      .getOne();
    const payload: Payload = { username: '', userId: 0 };
    let result: ReToken = {
      msg: '用户名或者密码错误',
    };
    if (user) {
      payload.username = user.account;
      payload.userId = user.id;
      result = {
        accessToken: this.jwtService.sign(payload),
        expiresIn: config.expiresIn,
        msg: 'success',
      };
    }

    return result;
  }

  async getUserInfo(payload: Payload): Promise<GetUserInfoR> {
    // 查询用户是否有效
    const user = await this.userRepo.findOne(payload.userId);
    // 查询用户的拥有角色
    const userRoles = await this.repo
      .createQueryBuilder()
      .where('user_id = :id', { id: payload.userId })
      .getMany();
    // 查询用户拥有角色
    const rolesR: string[] = [];
    if (userRoles.length > 0) {
      userRoles.forEach((item) => {
        rolesR.push(item.roleId || '');
      });
    }
    const roles = await this.role.findByIds(rolesR);
    // 查询角色菜单
    let roleMenus: SysRoleMenu[] = [];
    if (roles.length > 0) {
      for (let i = 0; i < roles.length; i++) {
        const item = roles[i];
        const r = await this.menuRepo
          .createQueryBuilder()
          .where('role_id = :id', { id: item.id })
          .getMany();
        roleMenus = roleMenus.concat(r);
      }
    }
    // 查询菜单
    let menusId: string[] = [];
    if (roleMenus.length > 0) {
      roleMenus.forEach((item) => {
        const foramtMenuId: string[] = item.menuId?.split(',') || [];
        menusId = menusId.concat(foramtMenuId);
      });
    }

    if (menusId.length > 0) {
      // 去重
      UniqLoda(menusId);
    }
    const menus = await this.menu.findByIds(menusId);
    this.logger.debug(`获取到的用户是${payload.userId} -> ${payload.username}`);
    this.logger.debug(`获取到的菜单是${JSON.stringify(menus)}`);
    this.logger.debug(`获取到的角色是${JSON.stringify(roles)}`);
    // TOOD 可以查询用户相关的更多信息
    return {
      userInfo: user,
      menus,
      roles,
    };
  }
}
