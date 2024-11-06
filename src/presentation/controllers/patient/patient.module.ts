import { Get, Module } from '@nestjs/common';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { GetByIdPatientController } from './get-patient-by-id/get-patient-by-id.controller';
import { GetBySlugPatientController } from './get-patient-by-slug/get-patient-by-slug.controller';
import { CreatePatientController } from './create-patient/create-patient.controller';
import { EditPatientController } from './edit-patient/edit-patient.controller';
import { DeletePatientController } from './delete-patient/delete-patient.controller';
import { NestGetPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-id';
import { NestGetPatientBySlugUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-slug';
import { NestCreatePatientUseCase } from '@/infrastructure/adapter/patient/nest-create-patient-use-case';
import { NestEditPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-edit-patient-by-id-use-case';
import { NestDeletePatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-delete-patient';
import { FetchPatientController } from './fetch-patient/fetch-patient.controller';
import { NestFetchPatientUseCase } from '@/infrastructure/adapter/patient/nest-fetch-patient-use-case';
import { GetByCpfPatientController } from './get-patient-by-cpf/get-patient-by-cpf.controller';
import { NestGetPatientByCpfUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-cpf';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    GetByIdPatientController,
    GetBySlugPatientController,
    GetByCpfPatientController,
    FetchPatientController,
    CreatePatientController,
    EditPatientController,
    DeletePatientController,
  ],
  providers: [
    NestGetPatientByIdUseCase,
    NestGetPatientBySlugUseCase,
    NestGetPatientByCpfUseCase,
    NestFetchPatientUseCase,
    NestCreatePatientUseCase,
    NestEditPatientByIdUseCase,
    NestDeletePatientByIdUseCase,
  ],
})
export class PatientModule {}
