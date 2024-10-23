import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { NeurofunctionalFactory } from 'test/factories/persistence-factories/make-neurofunctional-record-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';

describe('Get neurofunctional record by patient id [E2E]', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let neurofunctionalRecordFactory: NeurofunctionalFactory;
  let clinicianFactory: ClinicianFactory;
  let patientFactory: PatientFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [NeurofunctionalFactory, ClinicianFactory, PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    neurofunctionalRecordFactory = moduleRef.get(NeurofunctionalFactory);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[GET] /neurofunctional-record/by-id/:id', async () => {
    const clinician = await clinicianFactory.makeDatabaseClinician({});
    const patient = await patientFactory.makeDatabasePatient({});
    await neurofunctionalRecordFactory.makeDatabaseRecord({
      clinicianId: clinician.id,
      patientId: patient.id,
      universalMedicalRecordId: patient.universalMedicalRecord.id,
      anamnesis: 'test',
    });
    const token = jwt.sign({ sub: clinician.id.toString(), role: 'EMPLOYEE' });

    const result = await request(app.getHttpServer())
      .get(`/neurofunctional-record/by-patient-id/${patient.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toBe(200);
    expect(result.body.record.anamnesis).toEqual('test');
  });
});
