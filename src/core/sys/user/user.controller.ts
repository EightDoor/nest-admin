import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { SysUser } from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import { SysUserRole } from './userRole.entity';
import { SysUserRoleService } from './userRole.service';
import { LoginEntiry } from './login.entity';

@ApiTags('用户管理')
@Crud({
  model: {
    type: SysUser,
  },
})
@Controller('user')
export class UserController implements CrudController<SysUser> {
  constructor(
    public service: UserService,
    public userRoleService: SysUserRoleService,
  ) {}

  // 查询当前拥有角色
  @Get('roleList/:id')
  async getUserRoleList(@Param() params: { id: string }): Promise<SysUserRole> {
    return await this.userRoleService.getUserRoleList(params.id);
  }

  // 设置用户角色
  @Post('userRole')
  async setUserRole(@Body() body: SysUserRole): Promise<SysUserRole> {
    return await this.userRoleService.setUserRole(body);
  }
  // 登录
  @Post('login')
  async login(@Body() body: LoginEntiry): Promise<number> {
    console.log(body);
    return 1;
  }
}
