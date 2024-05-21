import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { ConsultationFactory } from 'test/factories/persistence-factories/make-consultation-database';

describe('Get consultation by id [E2E]', () => {
  let app: INestApplication;
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
    consultationFactory = moduleRef.get(ConsultationFactory);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[GET] /consultations/:id', async () => {
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
      .get(`/consultations/${consultation.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      consultations: expect.objectContaining({
        room: consultation.room,
        appointmentDate: consultation.appointmentDate.toISOString(),
      }),
    });
  });
});
