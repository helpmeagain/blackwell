import { InMemoryNeurofunctionalRecordRepository } from 'test/repositories/in-memory-neurofunctional-record-repository';
import { editNeurofunctionalRecord } from './edit-neurofunctional-record-by-id';
import { makeNeurofunctionalRecord } from 'test/factories/make-neurofunctional-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryRepository: InMemoryNeurofunctionalRecordRepository;
let sut: editNeurofunctionalRecord;

describe('Create Neurofunctional Record', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryNeurofunctionalRecordRepository();
    sut = new editNeurofunctionalRecord(inMemoryRepository);
  });

  it('should be able to create a neurofunctional record', async () => {
    const newNeurofunctional = makeNeurofunctionalRecord({}, new UniqueEntityId('id-1'));
    await inMemoryRepository.create(newNeurofunctional);

    const result = await sut.execute({
      id: 'id-1',
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
    expect(inMemoryRepository.items[0].patientMobility.postureChanges.drag).toBe(
      'Independent',
    );
    if (result.isRight()) {
      expect(result.value?.neurofunctionalRecord.anamnesis).toBe('anamnesis');
      expect(result.value?.neurofunctionalRecord.vitalSigns.heartRate).toBe(80);
      expect(
        result.value?.neurofunctionalRecord.patientMobility.postureChanges.drag,
      ).toBe('Independent');
    }
  });
});
