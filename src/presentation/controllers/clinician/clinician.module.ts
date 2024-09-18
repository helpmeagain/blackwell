import { Module } from '@nestjs/common';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { GetByIdClinicianController } from './get-clinician-by-id/get-clinician-by-id.controller';
import { GetBySlugClinicianController } from './get-clinician-by-slug/get-clinician-by-slug.controller';
import { CreateClinicianController } from './create-clinician/create-clinician.controller';
import { EditClinicianController } from './edit-clinician/edit-clinician.controller';
import { DeleteClinicianController } from './delete-clinician/delete-clinician.controller';
import { NestGetClinicianByIdUseCase } from '@/infrastructure/adapter/clinician/nest-get-clinician-by-id';
import { NestGetClinicianBySlugUseCase } from '@/infrastructure/adapter/clinician/nest-get-clinician-by-slug';
import { NestCreateClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-create-clinician-use-case';
import { NestEditClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-edit-clinician-by-id';
import { NestDeleteClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-delete-clinician-by-id';
import { FetchClinicianController } from './fetch-clinician/fetch-clinician.controller';
import { NestFetchClinicianUseCase } from '@/infrastructure/adapter/clinician/nest-fetch-clinician-use-case';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    GetByIdClinicianController,
    GetBySlugClinicianController,
    FetchClinicianController,
    CreateClinicianController,
    EditClinicianController,
    DeleteClinicianController,
  ],
  providers: [
    NestGetClinicianByIdUseCase,
    NestGetClinicianBySlugUseCase,
    NestFetchClinicianUseCase,
    NestCreateClinicianUseCase,
    NestEditClinicianUseCase,
    NestDeleteClinicianUseCase,
  ],
})
export class ClinicianModule {}
