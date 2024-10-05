import { InMemoryNeurofunctionalRecordRepository } from 'test/repositories/in-memory-neurofunctional-record-repository';
import { createNeurofunctionalRecord } from './create-neurofunctional-record';

let inMemoryRepository: InMemoryNeurofunctionalRecordRepository;
let sut: createNeurofunctionalRecord;

describe('Create Neurofunctional Record', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryNeurofunctionalRecordRepository();
    sut = new createNeurofunctionalRecord(inMemoryRepository);
  });

  it('should be able to create a neurofunctional record', async () => {
    const result = await sut.execute({
      clinicianId: '1',
      patientId: '1',
      universalMedicalRecordId: '1',
      medicalDiagnosis: 'diagnosis',
      anamnesis: 'anamnesis',
      physicalExamination: 'physical examination',
      triage: 'blue',
      lifestyleHabits: {
        alcoholConsumption: true,
        smoker: true,
        obesity: true,
        diabetes: true,
        drugUser: true,
        physicalActivity: true,
      },
      vitalSigns: {
        bloodPressure: 120,
        heartRate: 80,
        respiratoryRate: 20,
        oxygenSaturation: 95,
        bodyTemperature: 36.5,
      },
      physicalInspection: {
        independentMobility: true,
        usesCrutches: true,
        usesWalker: true,
        wheelchairUser: true,
        hasScar: true,
        hasBedsore: true,
        cooperative: true,
        nonCooperative: true,
        hydrated: true,
        hasHematoma: true,
        hasEdema: true,
        hasDeformity: true,
      },
      sensoryAssessment: {
        superficial: 'Tactile',
        deep: 'PositionSense',
        combinedSensations: {
          graphesthesia: true,
          barognosis: true,
          stereognosis: true,
        },
      },
      patientMobility: {
        threeMeterWalkTimeInSeconds: 10,
        hasFallRisk: true,
        postureChanges: {
          bridge: 'Independent',
          semiRollRight: 'Independent',
          semiRollLeft: 'Independent',
          fullRoll: 'Independent',
          drag: 'Independent',
          proneToForearmSupport: 'Independent',
          forearmSupportToAllFours: 'Independent',
          allFours: 'Independent',
          allFoursToKneeling: 'Independent',
          kneelingToHalfKneelingRight: 'Independent',
          kneelingToHalfKneelingLeft: 'Independent',
          halfKneelingRightToStanding: 'Independent',
          halfKneelingLeftToStanding: 'Independent',
        },
      },
      physiotherapyAssessment: {
        diagnosis: 'diagnosis',
        treatmentGoals: 'treatment goals',
        physiotherapeuticConduct: 'conduct',
      },
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items).toHaveLength(1);
    expect(inMemoryRepository.items[0].anamnesis).toBe('anamnesis');
    expect(inMemoryRepository.items[0].vitalSigns.heartRate).toBe(80);
    expect(inMemoryRepository.items[0].patientMobility.postureChanges.drag).toBe(
      'Independent',
    );
    expect(result.value?.neurofunctionalRecord.anamnesis).toBe('anamnesis');
    expect(result.value?.neurofunctionalRecord.vitalSigns.heartRate).toBe(80);
    expect(result.value?.neurofunctionalRecord.patientMobility.postureChanges.drag).toBe(
      'Independent',
    );
  });
});
