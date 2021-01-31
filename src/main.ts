import "reflect-metadata" //显示引入一下
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    // 关闭cors
    cors: false,
    // 关闭内置logger
    logger: true
  });

  // swagger
  const config = new DocumentBuilder()
    .setTitle("react-nest-admin后台管理")
    .setDescription("后台接口文档")
    .setVersion("1.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("doc", app, document)

  await app.listen(9102, '0.0.0.0');
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
