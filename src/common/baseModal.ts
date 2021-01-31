import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

// 公共的表添加
export abstract class BaseColumn {
  @PrimaryColumn({
    name: "id",
    generated: "uuid",
    length: 32,
    comment: "主键",
  })
  id!: string;
  @CreateDateColumn({
    name: "created_at",
    comment: "创建时间",
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    unique: false,
    name: "updated_at",
    comment: "更新时间",
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @Column(
    {
      unique: false,
      comment: "删除时间",
      name: "deleted_at",
    }
  )
  deletedAt?: Date;
}