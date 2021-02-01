import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { SysDict } from './dict.entity';
import { DictService } from './dict.service';

@ApiTags("字典管理")
@Crud({
  model: {
    type: SysDict
  }
})
@Controller('dict')
export class DictController implements CrudController<SysDict> {
  constructor(public service: DictService) { }
}
