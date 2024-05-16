import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from '@/infrastructure/env/env.service';
import { SwaggerService } from './docs/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  const swaggerService = app.get(SwaggerService);
  swaggerService.createDocument(app);

  const envService = app.get(EnvService);
  const port = envService.get('PORT');
  await app.listen(port);
  console.log(`Server is running! Swagger documentation: http://localhost:${port}/api/`);
}
bootstrap();
