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
      address: universalMedicalRecord.address,
      city: universalMedicalRecord.city,
      state: universalMedicalRecord.state,
      emergencyContactEmail: universalMedicalRecord.emergencyContactEmail,
      emergencyContactNumber: universalMedicalRecord.emergencyContactNumber,
      cpf: universalMedicalRecord.cpf,
      allergies: universalMedicalRecord.allergies,
      maritalStatus: universalMedicalRecord.maritalStatus,
      height: universalMedicalRecord.height,
      weight: universalMedicalRecord.weight,
      medicationsInUse: universalMedicalRecord.medicationsInUse,
      diagnosis: universalMedicalRecord.diagnosis,
    };
  }
}
