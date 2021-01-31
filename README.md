基础
日志处理 
• 使用 nestjs-pino
typeOrm启用缓存存储
• redis 默认1s内查询都是缓存数据
快捷创建crud
• 使用库 https://github.com/nestjsx/crud/wiki/ServiceTypeorms
接口文档 swagger
• 地址: https://github.com/nestjs/swagger
参数校验
• class-validator   https://github.com/typestack/class-validator
问题处理
• hot reload加载 兼容webpack5
• npm i --save-dev webpack-node-externals start-server-nestj-webpack-plugin
// 并创建文件webpack-hmr.config.js
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-nestjs-webpack-plugin');
module.exports = function(options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
          paths: [/\.js$/, /\.d\.ts$/]
      }),
      new StartServerPlugin({ name: options.output.filename }),
    ],
  };
};
• package.json
• "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js"
建立实体(示例)
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('user', { schema: 'koa' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;
  @Column('varchar', {
    nullable: false,
    unique: true,
    length: 150,
    name: 'uuid',
    generated: 'uuid',
  })
  uuid: string;
  @Column('varchar', {
    nullable: false,
    unique: true,
    length: 100,
    name: 'name',
  })
  name: string;
  @Column('varchar', {
    nullable: false,
    name: 'password',
  })
  password: string;
  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'email',
  })
  email: string | null;
  @Column('varchar', {
    nullable: true,
    length: 11,
    name: 'mobile',
  })
  mobile: string | null;
  @Column('tinyint', {
    nullable: true,
    default: () => 0,
    name: 'gender',
  })
  gender: number | null;
  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'create_at',
  })
  createAt: Date;
  @Column('timestamp', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'update_at',
  })
  updateAt: Date;
}