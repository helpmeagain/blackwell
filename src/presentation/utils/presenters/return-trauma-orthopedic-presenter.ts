import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';

export class ReturnTraumaOrthopedicPresenter {
  static toHTTP(traumaorthopedicRecord: TraumaOrthopedicRecord) {
    return {
      id: traumaorthopedicRecord.id.toString(),
      clinicianId: traumaorthopedicRecord.clinicianId.toString(),
      patientId: traumaorthopedicRecord.patientId.toString(),
      universalMedicalRecordId: traumaorthopedicRecord.universalMedicalRecordId.toString(),
      medicalDiagnosis: traumaorthopedicRecord.medicalDiagnosis,
      anamnesis: traumaorthopedicRecord.anamnesis,
      physicalExamination: traumaorthopedicRecord.physicalExamination,
      physiotherapyDepartment: traumaorthopedicRecord.physiotherapyDepartment,
      triage: traumaorthopedicRecord.triage,
      palpation: traumaorthopedicRecord.palpation,
      edema: traumaorthopedicRecord.edema,
      pittingTest: traumaorthopedicRecord.pittingTest,
      fingerPressureTest: traumaorthopedicRecord.fingerPressureTest,
      perimetry: traumaorthopedicRecord.perimetry,
      subjectivePainAssessment: traumaorthopedicRecord.subjectivePainAssessment,
      specialOrthopedicTest: traumaorthopedicRecord.specialOrthopedicTest,
      createdAt: traumaorthopedicRecord.createdAt,
      updatedAt: traumaorthopedicRecord.updatedAt,
    };
  }
}
