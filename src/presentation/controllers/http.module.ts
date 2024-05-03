import { Module } from '@nestjs/common';
import { CreateClinicianController } from './clinician/create-clinician/create-clinician.controller';
import { AuthenticateClinicianController } from './clinician/authenticate-clinician.controller';
import { CreateConsultationController } from './consultation/create-consultation.controller';
import { CreatePatientController } from './patient/create-patient.controller';
import { FetchRecentConsultationsController } from './consultation/fetch-recent-consultations.controller';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { NestCreateClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-create-clinician-use-case';

@Module({
  imports: [PersistenceModule],
  controllers: [
    CreateClinicianController,
    AuthenticateClinicianController,
    CreateConsultationController,
    CreatePatientController,
    FetchRecentConsultationsController,
  ],
  providers: [NestCreateClinicianUseCase],
})
export class HttpModule {}
