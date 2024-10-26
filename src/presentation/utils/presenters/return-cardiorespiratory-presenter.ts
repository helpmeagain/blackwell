import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';

export class ReturnCardiorespiratoryPresenter {
  static toHTTP(cardiorespiratoryRecord: CardiorespiratoryRecord) {
    return {
      id: cardiorespiratoryRecord.id.toString(),
      clinicianId: cardiorespiratoryRecord.clinicianId.toString(),
      patientId: cardiorespiratoryRecord.patientId.toString(),
      universalMedicalRecordId: cardiorespiratoryRecord.universalMedicalRecordId.toString(),
      medicalDiagnosis: cardiorespiratoryRecord.medicalDiagnosis,
      anamnesis: cardiorespiratoryRecord.anamnesis,
      physicalExamination: cardiorespiratoryRecord.physicalExamination,
      physiotherapyDepartment: cardiorespiratoryRecord.physiotherapyDepartment,
      triage: cardiorespiratoryRecord.triage,
      lifestyleHabits: cardiorespiratoryRecord.lifestyleHabits,
      physicalInspection: cardiorespiratoryRecord.physicalInspection,
      vitalSigns: cardiorespiratoryRecord.vitalSigns,
      pneumofunctionalAssessment: cardiorespiratoryRecord.pneumofunctionalAssessment,
      cardiofunctionalAssessment: cardiorespiratoryRecord.cardiofunctionalAssessment,
      createdAt: cardiorespiratoryRecord.createdAt,
      updatedAt: cardiorespiratoryRecord.updatedAt,
    };
  }
}
