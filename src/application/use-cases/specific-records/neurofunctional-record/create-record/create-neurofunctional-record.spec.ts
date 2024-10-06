import { InMemoryNeurofunctionalRecordRepository } from 'test/repositories/in-memory-neurofunctional-record-repository';
import { createNeurofunctionalRecord } from './create-neurofunctional-record';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { makePatient } from 'test/factories/make-patient';
import { makeClinician } from 'test/factories/make-clinician';

let inMemoryNeurofunctionalRecordRepository: InMemoryNeurofunctionalRecordRepository;
let inMemoryPatientRepository: InMemoryPatientRepository;
let inMemoryClinicianRepository: InMemoryClinicianRepository;
let sut: createNeurofunctionalRecord;

describe('Create Neurofunctional Record', () => {
  beforeEach(() => {
    inMemoryNeurofunctionalRecordRepository =
      new InMemoryNeurofunctionalRecordRepository();
    inMemoryPatientRepository = new InMemoryPatientRepository();
    inMemoryClinicianRepository = new InMemoryClinicianRepository();
    sut = new createNeurofunctionalRecord(
      inMemoryNeurofunctionalRecordRepository,
      inMemoryPatientRepository,
      inMemoryClinicianRepository,
    );
  });

  it('should be able to create a neurofunctional record', async () => {
    const patient = makePatient();
    const clinician = makeClinician();
    await inMemoryPatientRepository.create(patient);
    await inMemoryClinicianRepository.create(clinician);

    const result = await sut.execute({
      clinicianId: clinician.id.toString(),
      patientId: patient.id.toString(),
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
    expect(inMemoryNeurofunctionalRecordRepository.items).toHaveLength(1);
    expect(inMemoryNeurofunctionalRecordRepository.items[0].anamnesis).toBe('anamnesis');
    expect(inMemoryNeurofunctionalRecordRepository.items[0].vitalSigns.heartRate).toBe(
      80,
    );
    expect(
      inMemoryNeurofunctionalRecordRepository.items[0].patientMobility.postureChanges
        .drag,
    ).toBe('Independent');

    if (result.isRight()) {
      expect(result.value?.neurofunctionalRecord.anamnesis).toBe('anamnesis');
      expect(result.value?.neurofunctionalRecord.vitalSigns.heartRate).toBe(80);
      expect(
        result.value?.neurofunctionalRecord.patientMobility.postureChanges.drag,
      ).toBe('Independent');
    }
  });
});
