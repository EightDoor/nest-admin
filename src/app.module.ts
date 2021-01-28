import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { ShareModule } from './share/share.module';
import { CoreModule } from './core/core.module';
import { BusinessModule } from './business/business.module';
import * as winston from 'winston';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console(),
      ]
    }),
    TypeOrmModule.forRoot({
      autoLoadEntities: true
    }),
    ShareModule,
    CoreModule,
    BusinessModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
