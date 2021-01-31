import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";
import * as uuid from 'uuid';

// 公共的表添加
export abstract class BaseColumn {
  @ApiProperty({
    description: "主键",
    required: false,
  })
  @PrimaryColumn({
    name: "id",
    comment: "主键",
    type: "uuid",
    transformer: {
      to: () => {
        return uuid.v4().replace(/-/g, "");
      },
      from: (val: string) => {
        return val;
      }
    }
  })
  id!: string;

  @ApiProperty({
    description: "创建时间",
    required: false
  })
  @CreateDateColumn({
    name: "created_at",
    comment: "创建时间",
  })
  createdAt!: Date;

  @ApiProperty({
    description: "更新时间",
    required: false
  })
  @UpdateDateColumn({
    unique: false,
    name: "updated_at",
    comment: "更新时间",
  })
  updatedAt?: Date;

  @ApiProperty({
    description: "删除时间",
    required: false
  })
  @Column(
    {
      comment: "删除时间",
      name: "deleted_at",
      nullable: true,
    }
  )
  deletedAt?: Date;
}