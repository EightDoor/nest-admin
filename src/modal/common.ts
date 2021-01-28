import { Column, PrimaryGeneratedColumn } from "typeorm";

// 公共的表添加
export abstract class CommonColumn {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  CreateTimeAt!: number;
  @Column()
  UpdateTimeAt!: number;
  @Column()
  DeleteTimeAt!: number;
}