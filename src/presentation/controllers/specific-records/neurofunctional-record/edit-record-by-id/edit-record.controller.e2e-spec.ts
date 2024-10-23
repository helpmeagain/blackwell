import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { NeurofunctionalFactory } from 'test/factories/persistence-factories/make-neurofunctional-record-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';

describe('Edit neurofunctional record by id [E2E]', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let neurofunctionalRecordFactory: NeurofunctionalFactory;
  let clinicianFactory: ClinicianFactory;
  let patientFactory: PatientFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [NeurofunctionalFactory, ClinicianFactory, PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    neurofunctionalRecordFactory = moduleRef.get(NeurofunctionalFactory);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[PUT] /neurofunctional-record/:id', async () => {
    const clinician = await clinicianFactory.makeDatabaseClinician({});
    const patient = await patientFactory.makeDatabasePatient({});
    const record = await neurofunctionalRecordFactory.makeDatabaseRecord({
      clinicianId: clinician.id,
      patientId: patient.id,
      universalMedicalRecordId: patient.universalMedicalRecord.id,
    });
    const token = jwt.sign({ sub: clinician.id.toString(), role: 'EMPLOYEE' });

    const result = await request(app.getHttpServer())
      .put(`/neurofunctional-record/${record.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        medicalDiagnosis: 'Edited',
        anamnesis: 'Edited',
        physicalExamination: 'Edited',
        triage: 'blue',
        lifestyleHabits: {
          alcoholConsumption: false,
          smoker: false,
          obesity: false,
          diabetes: false,
          drugUser: false,
          physicalActivity: false,
        },
        vitalSigns: {
          bloodPressure: 0,
          heartRate: 0,
          respiratoryRate: 0,
          oxygenSaturation: 0,
          bodyTemperature: 0,
        },
        physicalInspection: {
          independentMobility: false,
          usesCrutches: false,
          usesWalker: false,
          wheelchairUser: false,
          hasScar: false,
          hasBedsore: false,
          cooperative: false,
          nonCooperative: false,
          hydrated: false,
          hasHematoma: false,
          hasEdema: false,
          hasDeformity: false,
        },
        sensoryAssessment: {
          superficial: 'Tactile',
          deep: 'PositionSense',
          combinedSensations: {
            graphesthesia: false,
            barognosis: false,
            stereognosis: false,
          },
        },
        patientMobility: {
          threeMeterWalkTimeInSeconds: 5,
          hasFallRisk: false,
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
          diagnosis: 'Edited',
          treatmentGoals: 'Edited',
          physiotherapeuticConduct: 'Edited',
        },
      });

    expect(result.statusCode).toBe(200);
    expect(result.body.record.anamnesis).toEqual('Edited');
    expect(result.body.record.physiotherapyAssessment.treatmentGoals).toEqual('Edited');
  });
});
