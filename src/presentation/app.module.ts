import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { CreateClinicianController } from './controllers/clinician/create-clinician.controller';
import { envSchema } from './env';
import { AuthModule } from '@/infrastructure/auth/auth.module';
import { AuthenticateClinicianController } from './controllers/clinician/authenticate-clinician.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (obj) => envSchema.parse(obj),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [CreateClinicianController, AuthenticateClinicianController],
  providers: [PrismaService],
})
export class AppModule {}
