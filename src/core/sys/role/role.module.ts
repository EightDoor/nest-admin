import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { SysRole } from './role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([SysRole])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule { }
