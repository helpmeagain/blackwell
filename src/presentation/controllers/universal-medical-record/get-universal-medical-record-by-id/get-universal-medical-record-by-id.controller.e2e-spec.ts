import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Get universal medical record by id [E2E]', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let patientFactory: PatientFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[GET] /universal-medical-record/:id', async () => {
    const patient = await patientFactory.makeDatabasePatient({});
    const token = jwt.sign({ sub: patient.id.toString(), role: 'CLIENT' });

    const result = await request(app.getHttpServer())
      .get(`/universal-medical-record/${patient.universalMedicalRecord.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.body).toMatchObject({
      universalMedicalRecord: expect.objectContaining({
        id: patient.universalMedicalRecord.id.toString(),
        patientId: patient.universalMedicalRecord.patientId.toString(),
        diagnosis: [],
      }),
    });
  });
});
