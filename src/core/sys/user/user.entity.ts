import { BaseColumn } from 'src/modal/common';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity("sys_user")
export class SysUser extends BaseColumn {
  // 密码
  @Column(
    {
      name: "pass_word",
      unique: true,
      comment: "密码",
    }
  )
  passWord!: string;

  // 账户
  @Column({
    name: "account",
    unique: true,
    comment: "账户",
  })
  account!: string;

  // 昵称
  @Column(
    {
      name: "nick_name",
      unique: true,
      comment: "昵称",
    }
  )
  nickName!: string;

  // 邮箱
  @Column({
    name: "email",
    unique: false,
    comment: "邮箱",
  })
  email?: string;

  // 所属状态是否有效  1是有效 0是失效
  @Column(
    {
      name: "status",
      unique: false,
      comment: "所属状态是否有效  1是有效 0是失效",
    }
  )
  status!: number;

  // 头像
  @Column({
    name: "avatar",
    unique: false,
    comment: "头像",
  })
  avatar?: string;

  // 部门id
  @Column({
    name: "dept_id",
    unique: true,
    comment: "部门id",
  })
  deptId!: string;

  // 手机号码
  @Column({
    name: "phone_num",
    unique: false,
    comment: "手机号码",
  })
  phoneNum?: string;
}