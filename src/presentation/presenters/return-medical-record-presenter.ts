import { MedicalRecord } from '@/domain/entities/medical-record';

export class ReturnMedicalRecordPresenter {
  static toHTTP(medicalRecord: MedicalRecord) {
    return {
      id: medicalRecord.id.toString(),
      patientId: medicalRecord.patientId.toString(),
      diagnosis: medicalRecord.diagnosis,
      comorbidity: medicalRecord.comorbidity,
      consultationsIds: medicalRecord.consultationsIds.currentItems.map((id) =>
        id.toString(),
      ),
    };
  }
}
