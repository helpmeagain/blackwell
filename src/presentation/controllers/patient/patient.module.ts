import { Module } from '@nestjs/common';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { GetByIdPatientController } from './get-patient-by-id/get-patient-by-id';
import { GetBySlugPatientController } from './get-patient-by-slug/get-patient-by-slug.controller';
import { CreatePatientController } from './create-patient/create-patient.controller';
import { EditPatientController } from './edit-patient/edit-patient.controller';
import { DeletePatientController } from './delete-patient/delete-patient.controller';
import { NestGetPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-id';
import { NestGetPatientBySlugUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-slug';
import { NestCreatePatientUseCase } from '@/infrastructure/adapter/patient/nest-create-patient-use-case';
import { NestEditPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-edit-patient-by-id-use-case';
import { NestDeletePatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-delete-patient';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    GetByIdPatientController,
    GetBySlugPatientController,
    CreatePatientController,
    EditPatientController,
    DeletePatientController,
  ],
  providers: [
    NestGetPatientByIdUseCase,
    NestGetPatientBySlugUseCase,
    NestCreatePatientUseCase,
    NestEditPatientByIdUseCase,
    NestDeletePatientByIdUseCase,
  ],
})
export class PatientModule {}
