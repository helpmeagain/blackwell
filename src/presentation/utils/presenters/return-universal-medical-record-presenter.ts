import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';

export class ReturnUniversalMedicalRecordPresenter {
  static toHTTP(universalMedicalRecord: UniversalMedicalRecord) {
    return {
      id: universalMedicalRecord.id.toString(),
      patientId: universalMedicalRecord.patientId.toString(),
      consultationsIds: universalMedicalRecord.consultationsIds.currentItems.map((id) =>
        id.toString(),
      ),
      profession: universalMedicalRecord.profession,
      emergencyContactEmail: universalMedicalRecord.emergencyContactEmail,
      emergencyContactNumber: universalMedicalRecord.emergencyContactNumber,
      maritalStatus: universalMedicalRecord.maritalStatus,
      height: universalMedicalRecord.height,
      weight: universalMedicalRecord.weight,
      allergies: universalMedicalRecord.allergies,
      medicationsInUse: universalMedicalRecord.medicationsInUse,
      diagnosis: universalMedicalRecord.diagnosis,
      createdAt: universalMedicalRecord.createdAt,
      updatedAt: universalMedicalRecord.updatedAt,
    };
  }
}
