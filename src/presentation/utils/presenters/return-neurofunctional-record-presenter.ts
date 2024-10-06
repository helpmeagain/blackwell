import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';

export class ReturnNeurofunctionalePresenter {
  static toHTTP(neurofunctionalRecord: NeurofunctionalRecord) {
    return {
      id: neurofunctionalRecord.id.toString(),
      clinicianId: neurofunctionalRecord.clinicianId.toString(),
      patientId: neurofunctionalRecord.patientId.toString(),
      universalMedicalRecordId: neurofunctionalRecord.universalMedicalRecordId.toString(),
      medicalDiagnosis: neurofunctionalRecord.medicalDiagnosis,
      anamnesis: neurofunctionalRecord.anamnesis,
      physicalExamination: neurofunctionalRecord.physicalExamination,
      physiotherapyDepartment: neurofunctionalRecord.physiotherapyDepartment,
      triage: neurofunctionalRecord.triage,
      lifestyleHabits: neurofunctionalRecord.lifestyleHabits,
      vitalSigns: neurofunctionalRecord.vitalSigns,
      physicalInspection: neurofunctionalRecord.physicalInspection,
      sensoryAssessment: neurofunctionalRecord.sensoryAssessment,
      patientMobility: neurofunctionalRecord.patientMobility,
      physiotherapyAssessment: neurofunctionalRecord.physiotherapyAssessment,
      createdAt: neurofunctionalRecord.createdAt,
      updatedAt: neurofunctionalRecord.updatedAt,
    };
  }
}
