import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Get clinician by id [E2E]', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let clinicianFactory: ClinicianFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [ClinicianFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    await app.init();
  });

  test('[GET] /clinicians/by-id/:id', async () => {
    const clinician = await clinicianFactory.makeDatabaseClinician({});
    const token = jwt.sign({ sub: clinician.id.toString(), role: 'EMPLOYEE' });

    const result = await request(app.getHttpServer())
      .get(`/clinicians/by-id/${clinician.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      clinician: expect.objectContaining({
        id: clinician.id.toString(),
        name: clinician.name,
        surname: clinician.surname,
        gender: clinician.gender,
        occupation: clinician.occupation,
        phoneNumber: clinician.phoneNumber,
        email: clinician.email,
        password: '*********',
        slug: clinician.slug.value,
      }),
    });
  });
});
