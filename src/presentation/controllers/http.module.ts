import { Module } from '@nestjs/common';
import { CreateClinicianController } from './clinician/create-clinician/create-clinician.controller';
import { AuthenticateClinicianController } from './authenticate/clinician/authenticate-clinician.controller';
import { CreateConsultationController } from './consultation/create-consultation.controller';
import { CreatePatientController } from './patient/create-patient.controller';
import { FetchRecentConsultationsController } from './consultation/fetch-recent-consultations.controller';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { NestCreateClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-create-clinician-use-case';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { NestAuthenticateClinicianUseCase } from '@/infrastructure/adapter/authenticate/nest-authenticate-clinician-use-case';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    CreateClinicianController,
    AuthenticateClinicianController,
    CreateConsultationController,
    CreatePatientController,
    FetchRecentConsultationsController,
  ],
  providers: [NestCreateClinicianUseCase, NestAuthenticateClinicianUseCase],
})
export class HttpModule {}
