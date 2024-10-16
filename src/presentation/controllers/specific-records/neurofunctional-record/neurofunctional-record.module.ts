import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { Module } from '@nestjs/common';
import { CreateNeurofunctionalRecordController } from './create-record/create-record.controller';
import { NestCreateNeurofunctionalRecordUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-create-neurofunctional-record';
import { GetByIdNeurofunctionalController } from './get-record-by-id/get-record-by-id.controller';
import { NestGetNeurofunctionalByIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-id';
import { GetByPatientIdNeurofunctionalController } from './get-record-by-patient-id/get-record-by-patient-id.controller';
import { NestGetNeurofunctionalByPatientIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-patient-id';
import { FetchNeurofunctionalRecordController } from './fetch-records-ids-by-clinician-id/fetch-records-ids-by-clinician-id.controller';
import { NestFetchNeurofunctionalIdsByClinicianIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-fetch-neurofunctional-ids-by-clinician-id-use-case';
import { EditNeurofunctionalRecordController } from './edit-record-by-id/edit-record.controller';
import { NestEditNeurofunctionalByIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-edit-neurofunctional-record';
import { AskForAuthorizationController } from './authorization/ask-for-authorization/ask-for-authorization.controller';
import { NestAskForAuthorizationUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-ask-for-authorization';
import { AuthorizeAccessUseCaseController } from './authorization/authorize-access/authorize-access.controller';
import { NestAuthorizeAccessUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-authorize-access';

@Module({
  imports: [PersistenceModule],
  controllers: [
    AskForAuthorizationController,
    AuthorizeAccessUseCaseController,
    CreateNeurofunctionalRecordController,
    GetByIdNeurofunctionalController,
    GetByPatientIdNeurofunctionalController,
    FetchNeurofunctionalRecordController,
    EditNeurofunctionalRecordController,
  ],
  providers: [
    NestAskForAuthorizationUseCase,
    NestAuthorizeAccessUseCase,
    NestCreateNeurofunctionalRecordUseCase,
    NestGetNeurofunctionalByIdUseCase,
    NestGetNeurofunctionalByPatientIdUseCase,
    NestFetchNeurofunctionalIdsByClinicianIdUseCase,
    NestEditNeurofunctionalByIdUseCase,
  ],
})
export class NeurofunctionalRecordModule {}
