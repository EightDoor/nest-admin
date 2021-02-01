import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { SysMenu } from './menu.entity';
import { MenuService } from './menu.service';

@ApiTags("菜单管理")
@Crud({
  model: {
    type: SysMenu
  }
})
@Controller('menu')
export class MenuController implements CrudController<SysMenu> {
  constructor(public service: MenuService) { }
}
