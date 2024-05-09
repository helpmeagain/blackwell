import { Module } from '@nestjs/common';
import { CreateClinicianController } from './clinician/create-clinician/create-clinician.controller';
import { AuthenticateClinicianController } from './authenticate/clinician/authenticate-clinician.controller';
import { CreateConsultationController } from './consultation/create-consultation.controller';
import { CreatePatientController } from './patient/create-patient/create-patient.controller';
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
import { NestEditClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-edit-clinician-by-id';
import { EditClinicianController } from './clinician/edit-clinician/edit-clinician.controller';
import { GetBySlugPatientController } from './patient/get-patient-by-slug/get-patient-by-slug.controller';
import { NestGetPatientBySlugUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-slug';
import { GetByIdPatientController } from './patient/get-patient-by-id/get-patient-by-id';
import { NestGetPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-id';
import { DeletePatientController } from './patient/delete-patient/delete-patient.controller';
import { NestDeletePatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-delete-patient';
import { EditPatientController } from './patient/edit-patient/edit-patient.controller';
import { NestEditPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-edit-patient-by-id-use-case';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    // Auth
    AuthenticateClinicianController,
    AuthenticatePatientController,
    // Clinician
    GetByIdClinicianController,
    GetBySlugClinicianController,
    CreateClinicianController,
    EditClinicianController,
    DeleteClinicianController,
    // Patient
    GetByIdPatientController,
    GetBySlugPatientController,
    CreatePatientController,
    EditPatientController,
    DeletePatientController,
    // Consultation
    CreateConsultationController,
    FetchRecentConsultationsController,
  ],
  providers: [
    // Auth
    NestAuthenticateClinicianUseCase,
    NestAuthenticatePatientUseCase,
    // Clinician
    NestGetClinicianByIdUseCase,
    NestGetClinicianBySlugUseCase,
    NestCreateClinicianUseCase,
    NestEditClinicianUseCase,
    NestDeleteClinicianUseCase,
    // Patient
    NestGetPatientByIdUseCase,
    NestGetPatientBySlugUseCase,
    NestCreatePatientUseCase,
    NestEditPatientByIdUseCase,
    NestDeletePatientByIdUseCase,
  ],
})
export class HttpModule {}
