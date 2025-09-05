import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
// import { createSuperAdmin } from './seeds/create-super-admin';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // DataSource ni olish
  const dataSource = app.get(DataSource);

  //Faqat birinchi ishga tushirishda superadmin yaratadi
  // await createSuperAdmin(dataSource);

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use('/.well-known', express.static(join(__dirname, '..', '.well-known')));

  // Set global prefix for all APIs
  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(`IELTS PREP Course API's`)
    .setDescription('IELTS PREP Course API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0');

  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger is available on http://localhost:${PORT}/api/docs`);
}
bootstrap();
