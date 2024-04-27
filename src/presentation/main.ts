import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blackwell')
    .setDescription('API for a medical clinic using clean architecture ')
    .setVersion('0.0.1')
    .setLicense(
      'Apache License 2.0',
      'https://github.com/felipecomarques/blackwell/blob/main/LICENSE.txt',
    )
    .setExternalDoc('Source code', 'https://github.com/felipecomarques/blackwell')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
  console.log(
    `Server is running! You on can check the Swagger documentation on: http://localhost:8080/api/`,
  );
}
bootstrap();
