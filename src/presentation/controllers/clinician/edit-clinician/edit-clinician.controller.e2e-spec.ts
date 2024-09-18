import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Edit clinician [E2E]', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let clinicianFactory: ClinicianFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [ClinicianFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    await app.init();
  });

  test('[PUT] /clinicians/:id', async () => {
    const clinician = await clinicianFactory.makeDatabaseClinician({});
    const token = jwt.sign({ sub: clinician.id.toString() });

    const result = await request(app.getHttpServer())
      .put(`/clinicians/${clinician.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'ExampleName',
        surname: 'ExampleSurname',
        gender: 'other',
        occupation: 'ExampleJob',
        phoneNumber: '123456789',
        email: 'exampleEdit@email.com',
        password: '12345678qwertY',
      });
    expect(result.statusCode).toBe(200);

    const clinicianOnDatabase = await prisma.clinician.findUnique({
      where: {
        email: 'exampleEdit@email.com',
      },
    });

    expect(clinicianOnDatabase).toBeTruthy();
  });
});
