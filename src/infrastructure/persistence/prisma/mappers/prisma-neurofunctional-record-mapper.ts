import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import {
  NeurofunctionalRecord as NeurofunctionalRecordPrisma,
  Prisma,
} from '@prisma/client';

export class PrismaNeurofunctionalRecordMapper {
  static toDomain(raw: NeurofunctionalRecordPrisma): NeurofunctionalRecord {
    return NeurofunctionalRecord.create(
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
        lifestyleHabits: {
          alcoholConsumption: raw.alcoholConsumption,
          smoker: raw.smoker,
          obesity: raw.obesity,
          diabetes: raw.diabetes,
          drugUser: raw.drugUser,
          physicalActivity: raw.physicalActivity,
        },
        vitalSigns: {
          bloodPressure: raw.bloodPressure,
          heartRate: raw.heartRate,
          respiratoryRate: raw.respiratoryRate,
          oxygenSaturation: raw.oxygenSaturation,
          bodyTemperature: raw.bodyTemperature,
        },
        physicalInspection: {
          independentMobility: raw.independentMobility,
          usesCrutches: raw.usesCrutches,
          usesWalker: raw.usesWalker,
          wheelchairUser: raw.wheelchairUser,
          hasScar: raw.hasScar,
          hasBedsore: raw.hasBedsore,
          cooperative: raw.cooperative,
          nonCooperative: raw.nonCooperative,
          hydrated: raw.hydrated,
          hasHematoma: raw.hasHematoma,
          hasEdema: raw.hasEdema,
          hasDeformity: raw.hasDeformity,
        },
        sensoryAssessment: {
          superficial: raw.superficial,
          deep: raw.deep,
          combinedSensations: {
            graphesthesia: raw.graphesthesia,
            barognosis: raw.barognosis,
            stereognosis: raw.stereognosis,
          },
        },
        patientMobility: {
          threeMeterWalkTimeInSeconds: raw.threeMeterWalkTimeInSeconds,
          hasFallRisk: raw.hasFallRisk,
          postureChanges: {
            bridge: raw.bridge,
            semiRollRight: raw.semiRollRight,
            semiRollLeft: raw.semiRollLeft,
            fullRoll: raw.fullRoll,
            drag: raw.drag,
            proneToForearmSupport: raw.proneToForearmSupport,
            forearmSupportToAllFours: raw.forearmSupportToAllFours,
            allFours: raw.allFours,
            allFoursToKneeling: raw.allFoursToKneeling,
            kneelingToHalfKneelingRight: raw.kneelingToHalfKneelingRight,
            kneelingToHalfKneelingLeft: raw.kneelingToHalfKneelingLeft,
            halfKneelingRightToStanding: raw.halfKneelingRightToStanding,
            halfKneelingLeftToStanding: raw.halfKneelingLeftToStanding,
          },
        },
        physiotherapyAssessment: {
          diagnosis: raw.diagnosis,
          treatmentGoals: raw.treatmentGoals,
          physiotherapeuticConduct: raw.physiotherapeuticConduct,
        },
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(
    neurofunctionalRecord: NeurofunctionalRecord,
  ): Prisma.NeurofunctionalRecordUncheckedCreateInput {
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
      authorizedUsers: neurofunctionalRecord.authorizedUsers,
      pendingAuthorizationUsers: neurofunctionalRecord.pendingAuthorizationUsers,
      // lifestyleHabits: {
      alcoholConsumption: neurofunctionalRecord.lifestyleHabits.alcoholConsumption,
      smoker: neurofunctionalRecord.lifestyleHabits.smoker,
      obesity: neurofunctionalRecord.lifestyleHabits.obesity,
      diabetes: neurofunctionalRecord.lifestyleHabits.diabetes,
      drugUser: neurofunctionalRecord.lifestyleHabits.drugUser,
      physicalActivity: neurofunctionalRecord.lifestyleHabits.physicalActivity,
      // }
      // vitalSigns: {
      bloodPressure: neurofunctionalRecord.vitalSigns.bloodPressure,
      heartRate: neurofunctionalRecord.vitalSigns.heartRate,
      respiratoryRate: neurofunctionalRecord.vitalSigns.respiratoryRate,
      oxygenSaturation: neurofunctionalRecord.vitalSigns.oxygenSaturation,
      bodyTemperature: neurofunctionalRecord.vitalSigns.bodyTemperature,
      // }
      // physicalInspection: {
      independentMobility: neurofunctionalRecord.physicalInspection.independentMobility,
      usesCrutches: neurofunctionalRecord.physicalInspection.usesCrutches,
      usesWalker: neurofunctionalRecord.physicalInspection.usesWalker,
      wheelchairUser: neurofunctionalRecord.physicalInspection.wheelchairUser,
      hasScar: neurofunctionalRecord.physicalInspection.hasScar,
      hasBedsore: neurofunctionalRecord.physicalInspection.hasBedsore,
      cooperative: neurofunctionalRecord.physicalInspection.cooperative,
      nonCooperative: neurofunctionalRecord.physicalInspection.nonCooperative,
      hydrated: neurofunctionalRecord.physicalInspection.hydrated,
      hasHematoma: neurofunctionalRecord.physicalInspection.hasHematoma,
      hasEdema: neurofunctionalRecord.physicalInspection.hasEdema,
      hasDeformity: neurofunctionalRecord.physicalInspection.hasDeformity,
      // }

      // sensoryAssessment: {
      superficial: neurofunctionalRecord.sensoryAssessment.superficial,
      deep: neurofunctionalRecord.sensoryAssessment.deep,
      //    combinedSensations: {
      graphesthesia:
        neurofunctionalRecord.sensoryAssessment.combinedSensations.graphesthesia,
      barognosis: neurofunctionalRecord.sensoryAssessment.combinedSensations.barognosis,
      stereognosis:
        neurofunctionalRecord.sensoryAssessment.combinedSensations.stereognosis,
      //    },
      // },

      // patientMobility: {
      threeMeterWalkTimeInSeconds:
        neurofunctionalRecord.patientMobility.threeMeterWalkTimeInSeconds,
      hasFallRisk: neurofunctionalRecord.patientMobility.hasFallRisk,
      //    postureChanges: {
      bridge: neurofunctionalRecord.patientMobility.postureChanges.bridge,
      semiRollRight: neurofunctionalRecord.patientMobility.postureChanges.semiRollRight,
      semiRollLeft: neurofunctionalRecord.patientMobility.postureChanges.semiRollLeft,
      fullRoll: neurofunctionalRecord.patientMobility.postureChanges.fullRoll,
      drag: neurofunctionalRecord.patientMobility.postureChanges.drag,
      proneToForearmSupport:
        neurofunctionalRecord.patientMobility.postureChanges.proneToForearmSupport,
      forearmSupportToAllFours:
        neurofunctionalRecord.patientMobility.postureChanges.forearmSupportToAllFours,
      allFours: neurofunctionalRecord.patientMobility.postureChanges.allFours,
      allFoursToKneeling:
        neurofunctionalRecord.patientMobility.postureChanges.allFoursToKneeling,
      kneelingToHalfKneelingRight:
        neurofunctionalRecord.patientMobility.postureChanges.kneelingToHalfKneelingRight,
      kneelingToHalfKneelingLeft:
        neurofunctionalRecord.patientMobility.postureChanges.kneelingToHalfKneelingLeft,
      halfKneelingRightToStanding:
        neurofunctionalRecord.patientMobility.postureChanges.halfKneelingRightToStanding,
      halfKneelingLeftToStanding:
        neurofunctionalRecord.patientMobility.postureChanges.halfKneelingLeftToStanding,
      //    },
      // },

      // physiotherapyAssessment: {
      diagnosis: neurofunctionalRecord.physiotherapyAssessment.diagnosis,
      treatmentGoals: neurofunctionalRecord.physiotherapyAssessment.treatmentGoals,
      physiotherapeuticConduct:
        neurofunctionalRecord.physiotherapyAssessment.physiotherapeuticConduct,
      // },

      createdAt: neurofunctionalRecord.createdAt,
      updatedAt: neurofunctionalRecord.updatedAt || null,
    };
  }
}
