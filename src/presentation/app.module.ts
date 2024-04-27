import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { CreateClinicianController } from './controllers/clinician/create-clinician.controller';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (obj) => envSchema.parse(obj),
      isGlobal: true,
    }),
  ],
  controllers: [CreateClinicianController],
  providers: [PrismaService],
})
export class AppModule {}
