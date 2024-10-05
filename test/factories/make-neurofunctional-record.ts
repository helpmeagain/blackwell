import { fakerPT_BR as faker } from '@faker-js/faker';
import {
  NeurofunctionalRecord,
  NeurofunctionalRecordProps,
} from '@/domain/entities/specific-records/neurofunctional-record';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { MobilityStatus } from '@/domain/common/types/mobility-status-type';

const mobilityStatus: MobilityStatus[] = [
  'Independent',
  'PartiallyDependent',
  'Dependent',
  'CannotPerform',
];

export function makeNeurofunctionalRecord(
  override: Partial<NeurofunctionalRecordProps> = {},
  id?: UniqueEntityId,
) {
  const consultation = NeurofunctionalRecord.create(
    {
      clinicianId: new UniqueEntityId(),
      patientId: new UniqueEntityId(),
      universalMedicalRecordId: new UniqueEntityId(),
      medicalDiagnosis: faker.lorem.sentence(),
      anamnesis: faker.lorem.sentence(),
      physicalExamination: faker.lorem.sentence(),
      physiotherapyDepartment: 'Neurofunctional',
      triage: faker.helpers.arrayElement(['blue', 'green', 'yellow', 'orange']),
      lifestyleHabits: {
        alcoholConsumption: faker.datatype.boolean(),
        smoker: faker.datatype.boolean(),
        obesity: faker.datatype.boolean(),
        diabetes: faker.datatype.boolean(),
        drugUser: faker.datatype.boolean(),
        physicalActivity: faker.datatype.boolean(),
      },
      vitalSigns: {
        bloodPressure: faker.number.int(),
        heartRate: faker.number.int(),
        respiratoryRate: faker.number.int(),
        oxygenSaturation: faker.number.int(),
        bodyTemperature: faker.number.int(),
      },
      physicalInspection: {
        independentMobility: faker.datatype.boolean(),
        usesCrutches: faker.datatype.boolean(),
        usesWalker: faker.datatype.boolean(),
        wheelchairUser: faker.datatype.boolean(),
        hasScar: faker.datatype.boolean(),
        hasBedsore: faker.datatype.boolean(),
        cooperative: faker.datatype.boolean(),
        nonCooperative: faker.datatype.boolean(),
        hydrated: faker.datatype.boolean(),
        hasHematoma: faker.datatype.boolean(),
        hasEdema: faker.datatype.boolean(),
        hasDeformity: faker.datatype.boolean(),
      },
      sensoryAssessment: {
        superficial: faker.helpers.arrayElement(['Tactile', 'Thermal', 'Painful']),
        deep: faker.helpers.arrayElement(['PositionSense', 'MovementSense']),
        combinedSensations: {
          graphesthesia: faker.datatype.boolean(),
          barognosis: faker.datatype.boolean(),
          stereognosis: faker.datatype.boolean(),
        },
      },
      patientMobility: {
        threeMeterWalkTimeInSeconds: faker.number.int(),
        hasFallRisk: faker.datatype.boolean(),
        postureChanges: {
          bridge: faker.helpers.arrayElement(mobilityStatus),
          semiRollRight: faker.helpers.arrayElement(mobilityStatus),
          semiRollLeft: faker.helpers.arrayElement(mobilityStatus),
          fullRoll: faker.helpers.arrayElement(mobilityStatus),
          drag: faker.helpers.arrayElement(mobilityStatus),
          proneToForearmSupport: faker.helpers.arrayElement(mobilityStatus),
          forearmSupportToAllFours: faker.helpers.arrayElement(mobilityStatus),
          allFours: faker.helpers.arrayElement(mobilityStatus),
          allFoursToKneeling: faker.helpers.arrayElement(mobilityStatus),
          kneelingToHalfKneelingRight: faker.helpers.arrayElement(mobilityStatus),
          kneelingToHalfKneelingLeft: faker.helpers.arrayElement(mobilityStatus),
          halfKneelingRightToStanding: faker.helpers.arrayElement(mobilityStatus),
          halfKneelingLeftToStanding: faker.helpers.arrayElement(mobilityStatus),
        },
      },
      physiotherapyAssessment: {
        diagnosis: faker.lorem.sentence(),
        treatmentGoals: faker.lorem.sentence(),
        physiotherapeuticConduct: faker.lorem.sentence(),
      },
      ...override,
    },
    id,
  );

  return consultation;
}
