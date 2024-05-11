import { Module } from '@nestjs/common';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { GetMedicalRecordByIdController } from './get-medical-record-by-id/get-medical-record-by-id.controller';
import { NestGetMedicalRecordByIdUseCase } from '@/infrastructure/adapter/medical-record/nest-get-medical-record-by-id-use-case';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [GetMedicalRecordByIdController],
  providers: [NestGetMedicalRecordByIdUseCase],
})
export class MedicalRecordModule {}
