import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

describe('Delete patient by id [E2E]', () => {
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
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[DELETE] /patients/:id', async () => {
    const patient = await patientFactory.makeDatabasePatient({});
    const token = jwt.sign({ sub: patient.id.toString(), role: 'CLIENT' });

    const result = await request(app.getHttpServer())
      .delete(`/patients/${patient.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toBe(204);

    const patientOnDatabase = await prisma.patient.findUnique({
      where: {
        email: patient.email,
      },
    });

    expect(patientOnDatabase).toBeNull();
  });
});
