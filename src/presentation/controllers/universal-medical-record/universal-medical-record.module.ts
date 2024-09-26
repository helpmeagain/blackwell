import { Module } from '@nestjs/common';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { CryptographyModule } from '@/infrastructure/cryptography/cryptography.module';
import { GetUniversalMedicalRecordByPatientIdController } from './get-universal-medical-record-by-patient-id/get-universal-medical-record-by-patient-id.controller';
import { GetUniversalMedicalRecordByIdController } from './get-universal-medical-record-by-id/get-universal-medical-record-by-id.controller';
import { EditMedicalRecordByIdController } from './edit-universal-medical-record-by-id/edit-medical-record-by-id.controller';
import { EditUniversalMedicalRecordByPatientIdController } from './edit-universal-medical-record-by-patient-id/edit-universal-medical-record-by-patient-id.controller';
import { NestGetUniversalMedicalRecordByIdUseCase } from '@/infrastructure/adapter/universal-medical-record/nest-get-universal-medical-record-by-id-use-case';
import { NestEditUniversalMedicalRecordByPatientIdUseCase } from '@/infrastructure/adapter/universal-medical-record/nest-edit-universal-medical-record-by-patient-id-use-case';
import { NestGetUniversalMedicalRecordByPatientIdUseCase } from '@/infrastructure/adapter/universal-medical-record/nest-get-universal-medical-record-by-patient-id-use-case';
import { NestEditUniversalMedicalRecordByIdUseCase } from '@/infrastructure/adapter/universal-medical-record/nest-edit-universal-medical-record-by-id-use-case';

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    GetUniversalMedicalRecordByPatientIdController,
    GetUniversalMedicalRecordByIdController,
    EditMedicalRecordByIdController,
    EditUniversalMedicalRecordByPatientIdController,
  ],
  providers: [
    NestGetUniversalMedicalRecordByPatientIdUseCase,
    NestGetUniversalMedicalRecordByIdUseCase,
    NestEditUniversalMedicalRecordByIdUseCase,
    NestEditUniversalMedicalRecordByPatientIdUseCase,
  ],
})
export class UniversalMedicalRecordModule {}
