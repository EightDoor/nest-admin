import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { SysDept } from './dept.entity';
import { DeptService } from './dept.service';

@ApiTags("部门管理")
@Crud({
  model: {
    type: SysDept
  }
})
@Controller('dept')
export class DeptController implements CrudController<SysDept> {
  constructor(public service: DeptService) { }
}
