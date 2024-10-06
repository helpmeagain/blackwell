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

@Module({
  imports: [PersistenceModule],
  controllers: [
    CreateNeurofunctionalRecordController,
    GetByIdNeurofunctionalController,
    GetByPatientIdNeurofunctionalController,
    FetchNeurofunctionalRecordController,
  ],
  providers: [
    NestCreateNeurofunctionalRecordUseCase,
    NestGetNeurofunctionalByIdUseCase,
    NestGetNeurofunctionalByPatientIdUseCase,
    NestFetchNeurofunctionalIdsByClinicianIdUseCase,
  ],
})
export class NeurofunctionalRecordModule {}
