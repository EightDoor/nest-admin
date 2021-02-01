import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { SysRole } from './role.entity';
import { RoleService } from './role.service';

@ApiTags("角色管理")
@Crud({
  model: {
    type: SysRole
  }
})
@Controller('role')
export class RoleController implements CrudController<SysRole> {
  constructor(public service: RoleService) { }
}
