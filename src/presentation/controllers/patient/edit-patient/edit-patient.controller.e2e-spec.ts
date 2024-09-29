import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

describe('Edit patient by id [E2E]', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let patientFactory: PatientFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[PUT] /patients/:id', async () => {
    const patients = await patientFactory.makeDatabasePatient();
    const token = jwt.sign({ sub: patients.id.toString() });

    const result = await request(app.getHttpServer())
      .put(`/patients/${patients.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'ExampleName',
        surname: 'ExampleSurname',
        gender: 'other',
        cpf: '12345678901',
        birthDate: '2000-01-01T12:00:00.000Z',
        phoneNumber: '123456789',
        email: 'exampleEdit@email.com',
        password: '12345678qwertY',
      });

    expect(result.statusCode).toBe(200);
    const clinicianOnDatabase = await prisma.patient.findUnique({
      where: {
        email: 'exampleEdit@email.com',
      },
    });

    expect(clinicianOnDatabase).toBeTruthy();
  });
});
