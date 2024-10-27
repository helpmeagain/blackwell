import { TraumaOrthopedicRecord } from '@/domain/entities/specific-records/trauma-orthopedic-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import {
  TraumaOrthopedicRecord as TraumaOrthopedicRecordPrisma,
  Prisma,
} from '@prisma/client';

export class PrismaTraumaOrthopedicRecordMapper {
  static toDomain(raw: TraumaOrthopedicRecordPrisma): TraumaOrthopedicRecord {
    return TraumaOrthopedicRecord.create(
      {
        clinicianId: new UniqueEntityId(raw.clinicianId),
        patientId: new UniqueEntityId(raw.patientId),
        universalMedicalRecordId: new UniqueEntityId(raw.universalMedicalRecordId),
        medicalDiagnosis: raw.medicalDiagnosis,
        anamnesis: raw.anamnesis,
        physicalExamination: raw.physicalExamination,
        physiotherapyDepartment: raw.physiotherapyDepartment,
        triage: raw.triage,
        authorizedUsers: raw.authorizedUsers,
        pendingAuthorizationUsers: raw.pendingAuthorizationUsers,
        palpation: raw.palpation,
        edema: raw.edema,
        pittingTest: raw.pittingTest,
        fingerPressureTest: raw.fingerPressureTest,
        perimetry: {
          rightArm: raw.rightArm,
          leftArm: raw.leftArm,
          upperRightThigh: raw.upperRightThigh,
          upperLeftThigh: raw.upperLeftThigh,
          lowerRightThigh: raw.lowerRightThigh,
          lowerLeftThigh: raw.lowerLeftThigh,
          rightKnee: raw.rightKnee,
          leftKnee: raw.leftKnee,
        },
        subjectivePainAssessment: {
          intensity: raw.intensity,
          location: raw.location,
          characteristic: raw.characteristic,
        },
        specialOrthopedicTest: raw.specialOrthopedicTest,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(
    traumaorthopedicRecord: TraumaOrthopedicRecord,
  ): Prisma.TraumaOrthopedicRecordUncheckedCreateInput {
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
      authorizedUsers: traumaorthopedicRecord.authorizedUsers,
      pendingAuthorizationUsers: traumaorthopedicRecord.pendingAuthorizationUsers,
      palpation: traumaorthopedicRecord.palpation,
      edema: traumaorthopedicRecord.edema,
      pittingTest: traumaorthopedicRecord.pittingTest,
      fingerPressureTest: traumaorthopedicRecord.fingerPressureTest,
      // perimetry: {
      rightArm: traumaorthopedicRecord.perimetry.rightArm,
      leftArm: traumaorthopedicRecord.perimetry.leftArm,
      upperRightThigh: traumaorthopedicRecord.perimetry.upperRightThigh,
      upperLeftThigh: traumaorthopedicRecord.perimetry.upperLeftThigh,
      lowerRightThigh: traumaorthopedicRecord.perimetry.lowerRightThigh,
      lowerLeftThigh: traumaorthopedicRecord.perimetry.lowerLeftThigh,
      rightKnee: traumaorthopedicRecord.perimetry.rightKnee,
      leftKnee: traumaorthopedicRecord.perimetry.leftKnee,
      // }
      // subjectivePainAssessment: {
      intensity: traumaorthopedicRecord.subjectivePainAssessment.intensity,
      location: traumaorthopedicRecord.subjectivePainAssessment.location,
      characteristic: traumaorthopedicRecord.subjectivePainAssessment.characteristic,
      // }
      specialOrthopedicTest: traumaorthopedicRecord.specialOrthopedicTest,
      createdAt: traumaorthopedicRecord.createdAt,
      updatedAt: traumaorthopedicRecord.updatedAt || null,
    };
  }
}
