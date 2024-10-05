// import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { Module } from '@nestjs/common';
import { CreateNeurofunctionalRecordController } from './create-record/create-record.controller';
import { NestCreateNeurofunctionalRecordUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-create-neurofunctional-record';

@Module({
  imports: [PersistenceModule],
  controllers: [CreateNeurofunctionalRecordController],
  providers: [NestCreateNeurofunctionalRecordUseCase],
})
export class NeurofunctionalRecordModule {}
