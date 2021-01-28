import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  // 密码
  @Column()
  passWord!: string;

  // 账户
  @Column()
  account!: string;

  // 昵称
  @Column()
  nickName!: string;

  // 邮箱
  @Column()
  email!: string;

  // 所属状态是否有效  1是有效 0是失效
  @Column()
  status!: number;

  // 头像
  @Column()
  avatar!: string;

  // 部门id
  @Column()
  deptId!: string;

  // 手机号码
  @Column()
  phoneNum!: string;
}