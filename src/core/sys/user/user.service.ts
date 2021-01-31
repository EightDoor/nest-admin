import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { SysUser } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<SysUser> {
  constructor(@InjectRepository(SysUser) repo: Repository<SysUser>) {
    super(repo)
  }
}
