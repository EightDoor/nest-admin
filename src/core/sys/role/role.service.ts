import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { SysRole } from './role.entity';

@Injectable()
export class RoleService extends TypeOrmCrudService<SysRole> {
  constructor(@InjectRepository(SysRole) repo: Repository<SysRole>) {
    super(repo)
  }
}
