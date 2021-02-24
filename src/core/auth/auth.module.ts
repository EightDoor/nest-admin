import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'src/config';
import { SysUser } from '../sys/user/user.entity';
import { UserModule } from '../sys/user/user.module';
import { SysUserRole } from '../sys/user/userRole.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config.secret,
      signOptions: {
        expiresIn: config.expiresIn
      }
    }),
    TypeOrmModule.forFeature([SysUser, SysUserRole]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
