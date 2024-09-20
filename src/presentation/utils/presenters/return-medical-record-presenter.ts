import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';

export class ReturnUniversalMedicalRecordPresenter {
  static toHTTP(universalMedicalRecord: UniversalMedicalRecord) {
    return {
      id: universalMedicalRecord.id.toString(),
      patientId: universalMedicalRecord.patientId.toString(),
      diagnosis: universalMedicalRecord.diagnosis,
      comorbidity: universalMedicalRecord.comorbidity,
      consultationsIds: universalMedicalRecord.consultationsIds.currentItems.map((id) =>
        id.toString(),
      ),
    };
  }
}
