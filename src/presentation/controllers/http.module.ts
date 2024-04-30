import { Module } from '@nestjs/common';
import { CreateClinicianController } from './clinician/create-clinician.controller';
import { AuthenticateClinicianController } from './clinician/authenticate-clinician.controller';
import { CreateConsultationController } from './consultation/create-consultation.controller';
import { CreatePatientController } from './patient/create-patient.controller';
import { FetchRecentConsultationsController } from './consultation/fetch-recent-consultations.controller';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

@Module({
  controllers: [
    CreateClinicianController,
    AuthenticateClinicianController,
    CreateConsultationController,
    CreatePatientController,
    FetchRecentConsultationsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
