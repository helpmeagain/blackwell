import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { NeurofunctionalFactory } from 'test/factories/persistence-factories/make-neurofunctional-record-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';

describe('Fetch neurofunctional record ids by clinician id', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let neurofunctionalRecordFactory: NeurofunctionalFactory;
  let clinicianFactory: ClinicianFactory;
  let patientFactory: PatientFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [ClinicianFactory, NeurofunctionalFactory, PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    neurofunctionalRecordFactory = moduleRef.get(NeurofunctionalFactory);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[GET] /neurofunctional-record/fetch-ids-by-clinician-id/', async () => {
    const clinician = await clinicianFactory.makeDatabaseClinician();
    const [patient1, patient2, patient3] = await Promise.all([
      await patientFactory.makeDatabasePatient(),
      await patientFactory.makeDatabasePatient(),
      await patientFactory.makeDatabasePatient(),
    ]);
    await Promise.all([
      neurofunctionalRecordFactory.makeDatabaseRecord({
        clinicianId: clinician.id,
        patientId: patient1.id,
        universalMedicalRecordId: patient1.universalMedicalRecord.id,
        anamnesis: 'test',
      }),
      neurofunctionalRecordFactory.makeDatabaseRecord({
        clinicianId: clinician.id,
        patientId: patient2.id,
        universalMedicalRecordId: patient2.universalMedicalRecord.id,
        anamnesis: 'test',
      }),
      neurofunctionalRecordFactory.makeDatabaseRecord({
        clinicianId: clinician.id,
        patientId: patient3.id,
        universalMedicalRecordId: patient3.universalMedicalRecord.id,
        anamnesis: 'test',
      }),
    ]);
    const token = jwt.sign({ sub: clinician.id.toString(), role: 'EMPLOYEE' });

    const result = await request(app.getHttpServer())
      .get(`/neurofunctional-record/fetch-ids-by-clinician-id/${clinician.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .query({ page: 1 })
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.body.records).toHaveLength(3);
  });
});
