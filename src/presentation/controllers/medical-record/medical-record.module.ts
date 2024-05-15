import { Module } from '@nestjs/common';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { GetMedicalRecordByIdController } from './get-medical-record-by-id/get-medical-record-by-id.controller';
import { NestGetMedicalRecordByIdUseCase } from '@/infrastructure/adapter/medical-record/nest-get-medical-record-by-id-use-case';
import { EditMedicalRecordByPatientIdController } from './edit-medical-record-by-patient-id/edit-medical-record-by-patient-id.controller';
import { NestEditMedicalRecordByPatientIdUseCase } from '@/infrastructure/adapter/medical-record/nest-edit-medical-record-by-patient-id-use-case';
import { NestGetMedicalRecordByPatientIdUseCase } from '@/infrastructure/adapter/medical-record/nest-get-medical-record-by-patient-id-use-case';
import { GetMedicalRecordByPatientIdController } from './get-medical-record-by-patient-id/get-medical-record-by-patient-id.controller';
import { NestEditMedicalRecordByIdUseCase } from '@/infrastructure/adapter/medical-record/nest-edit-medical-record-by-id-use-case';
import { EditMedicalRecordByIdController } from './edit-medical-record-by-id/edit-medical-record-by-id.controller';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    GetMedicalRecordByPatientIdController,
    GetMedicalRecordByIdController,
    EditMedicalRecordByIdController,
    EditMedicalRecordByPatientIdController,
  ],
  providers: [
    NestGetMedicalRecordByPatientIdUseCase,
    NestGetMedicalRecordByIdUseCase,
    NestEditMedicalRecordByIdUseCase,
    NestEditMedicalRecordByPatientIdUseCase,
  ],
})
export class MedicalRecordModule {}
