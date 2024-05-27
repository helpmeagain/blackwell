import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { ConsultationFactory } from 'test/factories/persistence-factories/make-consultation-database';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';

describe('Edit consultation by id [E2E]', () => {
  let app: INestApplication;
  let prisma: PrismaService;
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
    prisma = moduleRef.get(PrismaService);
    consultationFactory = moduleRef.get(ConsultationFactory);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[PUT] /consultations/:id', async () => {
    const [patient, clinician] = await Promise.all([
      await patientFactory.makeDatabasePatient(),
      await clinicianFactory.makeDatabaseClinician(),
    ]);
    const consultation = await consultationFactory.makeDatabaseConsultation({
      clinicianId: clinician.id,
      patientId: patient.id,
      medicalRecordId: patient.medicalRecord.id,
    });
    const token = jwt.sign({ sub: clinician.id.toString() });

    const result = await request(app.getHttpServer())
      .put(`/consultations/${consultation.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ room: 1, appointmentDate: '2022-01-01T12:00:00.000Z' });

    expect(result.statusCode).toBe(200);

    const consultationOnDatabase = await prisma.consultation.findUnique({
      where: {
        id: consultation.id.toString(),
      },
    });

    expect(consultationOnDatabase?.room).toBe(1);
  });
});
