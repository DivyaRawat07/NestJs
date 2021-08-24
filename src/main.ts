import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const port = 3000;

  logger.log(`Application listening on port ${port}`)
  
  
  const options = new DocumentBuilder()
  .setTitle('nestjs-task-management')
  .setDescription('swagger Implemenation')
  .addBearerAuth()
  .setVersion('0.0.1')
  .build();
  
  const document = SwaggerModule.createDocument(app,options)
  SwaggerModule.setup('api', app, document)
  await app.listen(port);
}
bootstrap();
