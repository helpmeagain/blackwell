import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { Module } from '@nestjs/common';
import { CreateNeurofunctionalRecordController } from './create-record/create-record.controller';
import { NestCreateNeurofunctionalRecordUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-create-neurofunctional-record';
import { GetByIdNeurofunctionalController } from './get-record-by-id/get-record-by-id.controller';
import { NestGetNeurofunctionalByIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-id';
import { GetByPatientIdNeurofunctionalController } from './get-record-by-patient-id/get-record-by-patient-id.controller';
import { NestGetNeurofunctionalByPatientIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-patient-id';

@Module({
  imports: [PersistenceModule],
  controllers: [
    CreateNeurofunctionalRecordController,
    GetByIdNeurofunctionalController,
    GetByPatientIdNeurofunctionalController,
  ],
  providers: [
    NestCreateNeurofunctionalRecordUseCase,
    NestGetNeurofunctionalByIdUseCase,
    NestGetNeurofunctionalByPatientIdUseCase,
  ],
})
export class NeurofunctionalRecordModule {}
