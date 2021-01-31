import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Crud, CrudController } from '@nestjsx/crud';
import { SysUser } from './user.entity';

@Crud({
  model: {
    type: SysUser
  }
})
@Controller("user")
export class UserController implements CrudController<SysUser> {
  constructor(public service: UserService) { }
}
