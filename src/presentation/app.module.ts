import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from '../infrastructure/env/env';
import { AuthModule } from '@/infrastructure/auth/auth.module';
import { HttpModule } from './controllers/http.module';
import { EnvModule } from '@/infrastructure/env/env.module';
import { SwaggerModule } from './docs/swagger.module';
import { EventModule } from '@/infrastructure/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (obj) => envSchema.parse(obj),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
    EnvModule,
    SwaggerModule,
    EventModule,
  ],
})
export class AppModule {}
