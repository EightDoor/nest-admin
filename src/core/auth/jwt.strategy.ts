import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import config from 'src/config';
import { Payload } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SysUserRole } from '../sys/user/userRole.entity';
import { Repository } from 'typeorm';
import { SysUser } from '../sys/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(SysUser) private readonly userRepo: Repository<SysUser>, @InjectRepository(SysUserRole) private readonly repo: Repository<SysUserRole>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret
    })
  }

  async validate(payload: Payload): Promise<Payload> {
    
    // 查询用户是否有效
    const user = await this.userRepo.findOne(payload.userId)
    if (!user?.id) {
      throw new UnauthorizedException()
    }
    // 查询用户的拥有角色
    const roles = await this.repo.createQueryBuilder().where("user_id = :id", { id: payload.userId }).execute()
    // TOOD 可以查询用户相关的更多信息
    return {
      userId: payload.userId,
      username: payload.username,
      roles,
    }
  }
}