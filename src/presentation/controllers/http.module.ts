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
import { NestCreatePatientUseCase } from '@/infrastructure/adapter/patient/nest-create-patient-use-case';
import { AuthenticatePatientController } from './authenticate/patient/authenticate-patient.controller';
import { NestAuthenticatePatientUseCase } from '@/infrastructure/adapter/authenticate/nest-authenticate-patient-use-case';
import { NestGetClinicianByIdUseCase } from '@/infrastructure/adapter/clinician/nest-get-clinician-by-id';
import { GetByIdClinicianController } from './clinician/get-clinician-by-id/get-clinician-by-id.controller';
import { GetBySlugClinicianController } from './clinician/get-clinician-by-slug/get-clinician-by-slug.controller';
import { NestGetClinicianBySlugUseCase } from '@/infrastructure/adapter/clinician/nest-get-clinician-by-slug';
import { DeleteClinicianController } from './clinician/delete-clinician/delete-clinician.controller';
import { NestDeleteClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-delete-clinician-by-id';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    CreateClinicianController,
    AuthenticateClinicianController,
    AuthenticatePatientController,
    GetByIdClinicianController,
    GetBySlugClinicianController,
    DeleteClinicianController,
    CreateConsultationController,
    CreatePatientController,
    FetchRecentConsultationsController,
  ],
  providers: [
    NestCreateClinicianUseCase,
    NestAuthenticateClinicianUseCase,
    NestGetClinicianByIdUseCase,
    NestGetClinicianBySlugUseCase,
    NestDeleteClinicianUseCase,
    NestAuthenticatePatientUseCase,
    NestCreatePatientUseCase,
  ],
})
export class HttpModule {}
