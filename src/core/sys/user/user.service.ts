import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { SysUser } from './user.entity';
import utils from 'src/utils/index';

@Injectable()
export class UserService extends TypeOrmCrudService<SysUser> {
  constructor(@InjectRepository(SysUser) repo: Repository<SysUser>) {
    super(repo)
  }
  async createOne(req: CrudRequest, dto: SysUser): Promise<SysUser> {
    const data = dto;
    dto.passWord = utils.PasswordEncryPtion(data.passWord)
    const result = await this.repo.save(data)
    return result
  }
  async updateOne(req: CrudRequest, dto: SysUser): Promise<SysUser> {
    if (dto.passWord) {
      dto.passWord = utils.PasswordEncryPtion(dto.passWord)
    }
    const { id } = this.getParamFilters(req.parsed)
    await this.repo.update(id, dto)
    return dto
  }
}
