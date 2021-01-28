import { Module } from '@nestjs/common';
import { SysModule } from './sys/sys.module';

@Module({
  imports: [SysModule]
})
export class CoreModule { }
