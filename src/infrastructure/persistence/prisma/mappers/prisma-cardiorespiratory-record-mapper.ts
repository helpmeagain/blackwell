import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import {
  CardiorespiratoryRecord as CardiorespiratoryRecordPrisma,
  Prisma,
} from '@prisma/client';

export class PrismaCardiorespiratoryRecordMapper {
  static toDomain(raw: CardiorespiratoryRecordPrisma): CardiorespiratoryRecord {
    return CardiorespiratoryRecord.create(
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
        physicalInspection: {
          isFaceSinusPalpationHurtful: raw.isFaceSinusPalpationHurtful,
          nasalSecretion:{
            type: raw.type,
            isFetid: raw.isFetid,
            quantity: raw.quantity,
          },
          nasalItching: raw.nasalItching,
          sneezing: raw.sneezing,
          chestType: raw.chestType,
          respiratoryOrCardiacSigns: raw.respiratoryOrCardiacSigns,
        },
        VitalSigns: {
          heartRate: raw.heartRate,
          respiratoryRate: raw.respiratoryRate,
          bloodPressure: {
            systolic: raw.systolic,
            diastolic: raw.diastolic,
          },
          temperature: raw.temperature,
          oxygenSaturation: raw.oxygenSaturation,
        },
        pneumofunctionalAssessment: {
          peakFlow: {
            firstMeasurement: raw.firstMeasurement,
            secondMeasurement: raw.secondMeasurement,
            thirdMeasurement: raw.thirdMeasurement,
          },
          manovacuometry: {
            pemax: {
              firstMeasurement: raw.pemaxFirstMeasurement,
              secondMeasurement: raw.pemaxSecondMeasurement,
              thirdMeasurement: raw.pemaxThirdMeasurement,
            },
            pimax: {
              firstMeasurement: raw.pimaxFirstMeasurement,
              secondMeasurement: raw.pimaxSecondMeasurement,
              thirdMeasurement: raw.pimaxThirdMeasurement,
            },
          },
        },
        cardiofunctionalAssessment: {
          bmi: raw.bmi,
          abdominalPerimeter: raw.abdominalPerimeter,
          waistHipRatio: raw.waistHipRatio,
          bioimpedance: {
            bodyFat: raw.bodyFat,
            visceralFat: raw.visceralFat,
            muscleMassPercentage: raw.muscleMassPercentage,
          },
          adipometry: {
            skinfoldMeasurements: {
              bicipital: raw.bicipital,
              tricipital: raw.tricipital,
              subscapular: raw.subscapular,
              abdominal: raw.abdominal,
            },
          },
        }
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPersistence(
    cardiorespiratoryRecord: CardiorespiratoryRecord,
  ): Prisma.CardiorespiratoryRecordUncheckedCreateInput {
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
      authorizedUsers: cardiorespiratoryRecord.authorizedUsers,
      pendingAuthorizationUsers: cardiorespiratoryRecord.pendingAuthorizationUsers,
      // lifestyleHabits: {
      alcoholConsumption: cardiorespiratoryRecord.lifestyleHabits.alcoholConsumption,
      smoker: cardiorespiratoryRecord.lifestyleHabits.smoker,
      obesity: cardiorespiratoryRecord.lifestyleHabits.obesity,
      diabetes: cardiorespiratoryRecord.lifestyleHabits.diabetes,
      drugUser: cardiorespiratoryRecord.lifestyleHabits.drugUser,
      physicalActivity: cardiorespiratoryRecord.lifestyleHabits.physicalActivity,
      // }
      // physicalInspection: {
      isFaceSinusPalpationHurtful: cardiorespiratoryRecord.physicalInspection.isFaceSinusPalpationHurtful,
      //    nasalSecretion:{
      type: cardiorespiratoryRecord.physicalInspection.nasalSecretion.type,
      isFetid: cardiorespiratoryRecord.physicalInspection.nasalSecretion.isFetid,
      quantity: cardiorespiratoryRecord.physicalInspection.nasalSecretion.quantity,
      //    }
      nasalItching: cardiorespiratoryRecord.physicalInspection.nasalItching,
      sneezing: cardiorespiratoryRecord.physicalInspection.sneezing,
      chestType: cardiorespiratoryRecord.physicalInspection.chestType,
      respiratoryOrCardiacSigns: cardiorespiratoryRecord.physicalInspection.respiratoryOrCardiacSigns,
      // }
      // VitalSigns: {
      heartRate: cardiorespiratoryRecord.vitalSigns.heartRate,
      respiratoryRate: cardiorespiratoryRecord.vitalSigns.respiratoryRate,
      //    bloodPressure: {
      systolic: cardiorespiratoryRecord.vitalSigns.bloodPressure.systolic,
      diastolic: cardiorespiratoryRecord.vitalSigns.bloodPressure.diastolic,
      //    }
      temperature: cardiorespiratoryRecord.vitalSigns.temperature,
      oxygenSaturation: cardiorespiratoryRecord.vitalSigns.oxygenSaturation,
      // }
      // pneumofunctionalAssessment: {
      //    peakFlow: {
      firstMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.peakFlow.firstMeasurement,
      secondMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.peakFlow.secondMeasurement,
      thirdMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.peakFlow.thirdMeasurement,
      //    }
      //    manovacuometry: {
      //        pemax: {
      pemaxFirstMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.manovacuometry.pemax.firstMeasurement,
      pemaxSecondMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.manovacuometry.pemax.secondMeasurement,
      pemaxThirdMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.manovacuometry.pemax.thirdMeasurement,
      //        },
      //        pimax: {
      pimaxFirstMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.manovacuometry.pemax.firstMeasurement,
      pimaxSecondMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.manovacuometry.pemax.secondMeasurement,
      pimaxThirdMeasurement: cardiorespiratoryRecord.pneumofunctionalAssessment.manovacuometry.pemax.thirdMeasurement,
      //        },
      //    }
      // }
      // cardiofunctionalAssessment: {
      bmi: cardiorespiratoryRecord.cardiofunctionalAssessment.bmi,
      abdominalPerimeter: cardiorespiratoryRecord.cardiofunctionalAssessment.abdominalPerimeter,
      waistHipRatio: cardiorespiratoryRecord.cardiofunctionalAssessment.waistHipRatio,
      //    bioimpedance: {
      bodyFat: cardiorespiratoryRecord.cardiofunctionalAssessment.bioimpedance.bodyFat,
      visceralFat: cardiorespiratoryRecord.cardiofunctionalAssessment.bioimpedance.visceralFat,
      muscleMassPercentage: cardiorespiratoryRecord.cardiofunctionalAssessment.bioimpedance.muscleMassPercentage,
      //    },
      //    adipometry: {
      //        skinfoldMeasurements: {
      bicipital: cardiorespiratoryRecord.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.bicipital,
      tricipital: cardiorespiratoryRecord.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.tricipital,
      subscapular: cardiorespiratoryRecord.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.subscapular,
      abdominal: cardiorespiratoryRecord.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.abdominal,
      //        },
      //    },
      // }
    }
  }
}
