import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ConsultationFactory } from 'test/factories/persistence-factories/make-consultation-database';

describe('Fetch consultations', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let consultationFactory: ConsultationFactory;
  let clinicianFactory: ClinicianFactory;
  let patientFactory: PatientFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [ConsultationFactory, ClinicianFactory, PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    consultationFactory = moduleRef.get(ConsultationFactory);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[GET] /consultations/', async () => {
    const [patient, clinician] = await Promise.all([
      await patientFactory.makeDatabasePatient(),
      await clinicianFactory.makeDatabaseClinician(),
    ]);

    await Promise.all([
      consultationFactory.makeDatabaseConsultation({
        clinicianId: clinician.id,
        patientId: patient.id,
        universalMedicalRecordId: patient.universalMedicalRecord.id,
        room: 1,
      }),
      consultationFactory.makeDatabaseConsultation({
        clinicianId: clinician.id,
        patientId: patient.id,
        universalMedicalRecordId: patient.universalMedicalRecord.id,
        room: 2,
      }),
      consultationFactory.makeDatabaseConsultation({
        clinicianId: clinician.id,
        patientId: patient.id,
        universalMedicalRecordId: patient.universalMedicalRecord.id,
        room: 3,
      }),
    ]);
    const token = jwt.sign({ sub: clinician.id.toString(), role: 'EMPLOYEE' });

    const result = await request(app.getHttpServer())
      .get(`/consultations/`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      consultations: expect.arrayContaining([
        expect.objectContaining({
          room: 1,
        }),
        expect.objectContaining({
          room: 2,
        }),
        expect.objectContaining({
          room: 3,
        }),
      ]),
    });
  });
});
