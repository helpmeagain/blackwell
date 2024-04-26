import { Module } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { CreateClinicianController } from './controllers/clinician/create-clinician.controller';

@Module({
  imports: [],
  controllers: [CreateClinicianController],
  providers: [PrismaService],
})
export class AppModule {}
