import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Fetch clinicians', () => {
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

  test('[GET] /clinicians/', async () => {
    const [clinician1, clinician2, clinician3] = await Promise.all([
      await clinicianFactory.makeDatabaseClinician({ name: 'A' }),
      await clinicianFactory.makeDatabaseClinician({ name: 'B' }),
      await clinicianFactory.makeDatabaseClinician({ name: 'C' }),
    ]);
    const token = jwt.sign({ sub: clinician1.id.toString() });

    const result = await request(app.getHttpServer())
      .get(`/clinicians/`)
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1, orderBy: 'name', direction: 'desc' })
      .send();

    expect(result.statusCode).toBe(200);
    const expectedClinicians = [clinician3, clinician2, clinician1];

    expect(result.body.clinicians).toMatchObject(
      expectedClinicians.map((clinician) => ({
        name: clinician.name,
      })),
    );
  });
});
