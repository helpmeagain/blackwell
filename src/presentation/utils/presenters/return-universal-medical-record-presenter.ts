import { UniversalMedicalRecord } from '@/domain/entities/universal-medical-record';

export class ReturnUniversalMedicalRecordPresenter {
  static toHTTP(universalMedicalRecord: UniversalMedicalRecord) {
    return {
      id: universalMedicalRecord.id.toString(),
      patientId: universalMedicalRecord.patientId.toString(),
      // consultationsIds: universalMedicalRecord.consultationsIds.currentItems.map((id) =>
      //   id.toString(),
      // ),
      specificMedicalRecordsIds: {
        neurofunctionalRecord:
          universalMedicalRecord.neurofunctionalRecordId?.toString() ?? null,
        cardiorespiratoryRecord: 
          universalMedicalRecord.cardiorepiratoryRecordId?.toString() ?? null,
        traumatoOrthopedicRecord: 
          universalMedicalRecord.traumaOrthopedicRecordId?.toString() ?? null,
      },
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
