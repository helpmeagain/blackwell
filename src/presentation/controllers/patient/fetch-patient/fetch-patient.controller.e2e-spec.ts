import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Fetch patients', () => {
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

  test('[GET] /patients/', async () => {
    const [patient1, patient2, patient3] = await Promise.all([
      await patientFactory.makeDatabasePatient({ name: 'A' }),
      await patientFactory.makeDatabasePatient({ name: 'B' }),
      await patientFactory.makeDatabasePatient({ name: 'C' }),
    ]);
    const token = jwt.sign({ sub: patient1.id.toString(), role: 'CLIENT' });

    const result = await request(app.getHttpServer())
      .get(`/patients/`)
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1, orderBy: 'name', direction: 'desc' })
      .send();

    expect(result.statusCode).toBe(200);
    const expectedPatients = [patient3, patient2, patient1];

    expect(result.body.patients).toMatchObject(
      expectedPatients.map((patient) => ({
        name: patient.name,
      })),
    );
  });
});
