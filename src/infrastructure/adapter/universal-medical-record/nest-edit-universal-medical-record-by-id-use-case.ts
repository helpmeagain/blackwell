import { UniversalMedicalRecordRepository } from '@/application/repositories/universal-medical-record-repository';
import { EditUniversalMedicalRecordByIdUseCase } from '@/application/use-cases/universal-medical-record/edit-universal-medical-record-by-id/edit-universal-medical-record-by-id-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestEditUniversalMedicalRecordByIdUseCase extends EditUniversalMedicalRecordByIdUseCase {
  constructor(repository: UniversalMedicalRecordRepository) {
    super(repository);
  }
}
