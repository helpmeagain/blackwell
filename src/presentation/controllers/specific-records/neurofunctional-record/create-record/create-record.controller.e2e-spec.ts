import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';

describe('Create neurofunctional record [E2E]', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let patientFactory: PatientFactory;
  let clinicianFactory: ClinicianFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [PatientFactory, ClinicianFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    patientFactory = moduleRef.get(PatientFactory);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    await app.init();
  });

  test('[POST] /neurofunctional-record/patient-id/:patientId/clinician-id/:clinicianId', async () => {
    const [patient, clinician] = await Promise.all([
      await patientFactory.makeDatabasePatient(),
      await clinicianFactory.makeDatabaseClinician(),
    ]);
    const token = jwt.sign({ sub: clinician.id.toString(), role: 'EMPLOYEE' });

    const result = await request(app.getHttpServer())
      .post(
        `/neurofunctional-record/patient-id/${patient.id}/clinician-id/${clinician.id}`,
      )
      .set('Authorization', `Bearer ${token}`)
      .send({
        medicalDiagnosis: 'Test',
        anamnesis: 'Test',
        physicalExamination: 'Test',
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
          diagnosis: 'Test',
          treatmentGoals: 'Test',
          physiotherapeuticConduct: 'Test',
        },
      });

    expect(result.statusCode).toBe(201);

    const neurofunctionalRecordOnDatabase = await prisma.neurofunctionalRecord.findUnique(
      {
        where: {
          id: result.body.record.id,
        },
      },
    );

    expect(neurofunctionalRecordOnDatabase).toBeTruthy();
  });
});
