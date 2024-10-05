import { SpecificMedicalRecordProps } from './specific-medical-record';
import { SpecificMedicalRecord } from './specific-medical-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Optional } from '@/domain/common/types/optional-type';
import { MobilityStatus } from '@/domain/common/types/mobility-status-type';

export interface NeurofunctionalRecordProps extends SpecificMedicalRecordProps {
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

export class NeurofunctionalRecord extends SpecificMedicalRecord<NeurofunctionalRecordProps> {
  static create(
    props: Optional<NeurofunctionalRecordProps, 'physiotherapyDepartment' | 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const neurofunctionalRecord = new NeurofunctionalRecord(
      {
        ...props,
        physiotherapyDepartment: 'Neurofunctional',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return neurofunctionalRecord;
  }

  get lifestyleHabits() {
    return this.props.lifestyleHabits;
  }

  set lifestyleHabits(value: NeurofunctionalRecordProps['lifestyleHabits']) {
    this.props.lifestyleHabits = value;
    this.touch();
  }

  get vitalSigns() {
    return this.props.vitalSigns;
  }

  set vitalSigns(value: NeurofunctionalRecordProps['vitalSigns']) {
    this.props.vitalSigns = value;
    this.touch();
  }

  get physicalInspection() {
    return this.props.physicalInspection;
  }

  set physicalInspection(value: NeurofunctionalRecordProps['physicalInspection']) {
    this.props.physicalInspection = value;
    this.touch();
  }

  get sensoryAssessment() {
    return this.props.sensoryAssessment;
  }

  set sensoryAssessment(value: NeurofunctionalRecordProps['sensoryAssessment']) {
    this.props.sensoryAssessment = value;
    this.touch();
  }

  get patientMobility() {
    return this.props.patientMobility;
  }

  set patientMobility(value: NeurofunctionalRecordProps['patientMobility']) {
    this.props.patientMobility = value;
    this.touch();
  }

  get physiotherapyAssessment() {
    return this.props.physiotherapyAssessment;
  }

  set physiotherapyAssessment(
    value: NeurofunctionalRecordProps['physiotherapyAssessment'],
  ) {
    this.props.physiotherapyAssessment = value;
    this.touch();
  }
}
