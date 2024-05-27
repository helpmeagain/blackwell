import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';

describe('Create consultation [E2E]', () => {
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

  test('[POST] /consultations/clinician/:clinicianId/patient/:patientId/', async () => {
    const [patient, clinician] = await Promise.all([
      await patientFactory.makeDatabasePatient(),
      await clinicianFactory.makeDatabaseClinician(),
    ]);
    const token = jwt.sign({ sub: patient.id.toString() });

    const result = await request(app.getHttpServer())
      .post(
        `/consultations/clinician/${clinician.id.toString()}/patient/${patient.id.toString()}/`,
      )
      .set('Authorization', `Bearer ${token}`)
      .send({ room: 1, appointmentDate: '2022-01-01T12:00:00.000Z' });

    expect(result.statusCode).toBe(201);

    const consultationOnDatabase = await prisma.consultation.findUnique({
      where: {
        id: result.body.consultation.id,
      },
    });

    expect(consultationOnDatabase).toBeTruthy();
  });
});
