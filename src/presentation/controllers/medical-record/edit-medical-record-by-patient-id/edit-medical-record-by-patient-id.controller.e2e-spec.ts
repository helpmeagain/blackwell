import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

describe('Edit medical record by id [E2E]', () => {
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

  test('[PUT] /medical-records/by-patient-id/:id', async () => {
    const patients = await patientFactory.makeDatabasePatient();
    const token = jwt.sign({ sub: patients.id.toString() });

    const result = await request(app.getHttpServer())
      .put(
        `/medical-records/by-patient-id/${patients.medicalRecord.patientId.toString()}`,
      )
      .set('Authorization', `Bearer ${token}`)
      .send({
        diagnosis: 'some diagnosis',
        comorbidity: 'some comorbidity',
      });

    expect(result.statusCode).toBe(200);
    const medicalRecordOnDatabase = await prisma.medicalRecord.findUnique({
      where: {
        id: patients.medicalRecord.id.toString(),
      },
    });
    expect(medicalRecordOnDatabase?.diagnosis).toBe('some diagnosis');
  });
});
