import { Controller, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { SysUser } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("用户管理")
@Crud({
  model: {
    type: SysUser
  }
})
@Controller("user")
export class UserController implements CrudController<SysUser> {
  constructor(public service: UserService) { }
}
