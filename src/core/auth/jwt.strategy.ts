import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import config from 'src/config';
import { Payload } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SysUserRole } from '../sys/user/userRole.entity';
import { Repository } from 'typeorm';
import { SysUser } from '../sys/user/user.entity';
import { SysRoleMenu } from '../sys/role/roleMenu.entity';
import { uniq as UniqLoda } from 'lodash';
import { Logger } from 'nestjs-pino';
import { SysRole } from '../sys/role/role.entity';
import { SysMenu } from '../sys/menu/menu.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(SysUser) private readonly userRepo: Repository<SysUser>,
    @InjectRepository(SysUserRole)
    private readonly repo: Repository<SysUserRole>,
    @InjectRepository(SysRoleMenu)
    private readonly menuRepo: Repository<SysRoleMenu>,
    @InjectRepository(SysRole)
    private readonly role: Repository<SysRole>,
    @InjectRepository(SysMenu)
    private readonly menu: Repository<SysMenu>,
    private readonly logger: Logger,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  // TODO 待解决 每次查询接口都要查询菜单
  async validate(payload: Payload): Promise<Payload> {
    // 查询用户是否有效
    const user = await this.userRepo.findOne(payload.userId);
    if (!user?.id) {
      throw new UnauthorizedException();
    }
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
      userId: payload.userId,
      username: payload.username,
      roles,
      menus,
    };
  }
}
