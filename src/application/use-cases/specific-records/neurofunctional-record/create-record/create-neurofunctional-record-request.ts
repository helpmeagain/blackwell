import { MobilityStatus } from '@/domain/common/types/mobility-status-type';
import { Triage } from '@/domain/common/types/triage-type';

export interface createNeurofunctionalRecordRequest {
  clinicianId: string;
  patientId: string;
  universalMedicalRecordId: string;
  medicalDiagnosis: string;
  anamnesis: string;
  physicalExamination: string;
  triage: Triage;
  lifestyleHabits: {
    alcoholConsumption: boolean;
    smoker: boolean;
    obesity: boolean;
    diabetes: boolean;
    drugUser: boolean;
    physicalActivity: boolean;
  };
  vitalSigns: {
    bloodPressure: number;
    heartRate: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    bodyTemperature: number;
  };
  physicalInspection: {
    independentMobility: boolean;
    usesCrutches: boolean;
    usesWalker: boolean;
    wheelchairUser: boolean;
    hasScar: boolean;
    hasBedsore: boolean;
    cooperative: boolean;
    nonCooperative: boolean;
    hydrated: boolean;
    hasHematoma: boolean;
    hasEdema: boolean;
    hasDeformity: boolean;
  };
  sensoryAssessment: {
    superficial: 'Tactile' | 'Thermal' | 'Painful';
    deep: 'PositionSense' | 'MovementSense';
    combinedSensations: {
      graphesthesia: boolean;
      barognosis: boolean;
      stereognosis: boolean;
    };
  };
  patientMobility: {
    threeMeterWalkTimeInSeconds: number;
    hasFallRisk: boolean;
    postureChanges: {
      bridge: MobilityStatus;
      semiRollRight: MobilityStatus;
      semiRollLeft: MobilityStatus;
      fullRoll: MobilityStatus;
      drag: MobilityStatus;
      proneToForearmSupport: MobilityStatus;
      forearmSupportToAllFours: MobilityStatus;
      allFours: MobilityStatus;
      allFoursToKneeling: MobilityStatus;
      kneelingToHalfKneelingRight: MobilityStatus;
      kneelingToHalfKneelingLeft: MobilityStatus;
      halfKneelingRightToStanding: MobilityStatus;
      halfKneelingLeftToStanding: MobilityStatus;
    };
  };
  physiotherapyAssessment: {
    diagnosis: string;
    treatmentGoals: string;
    physiotherapeuticConduct: string;
  };
}
