import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvService } from '@/infrastructure/env/env.service';

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
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });

  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  await app.listen(port);
  console.log(`Server is running! Swagger documentation: http://localhost:${port}/api/`);
}
bootstrap();
