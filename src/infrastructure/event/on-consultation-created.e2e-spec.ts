import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PersistenceModule } from '../persistence/persistence.module';
import { ConsultationFactory } from 'test/factories/persistence-factories/make-consultation-database';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { waitFor } from 'test/utils/wait-for';
import { DomainEvents } from '@/domain/common/events/domain-events';

describe('On consultation created [E2E]', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let clinicianFactory: ClinicianFactory;
  let patientFactory: PatientFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [ConsultationFactory, ClinicianFactory, PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    jwt = moduleRef.get(JwtService);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    patientFactory = moduleRef.get(PatientFactory);

    DomainEvents.shouldRun = true;

    await app.init();
  });

  it('should send a notification when a consultation is created', async () => {
    const [patient, clinician] = await Promise.all([
      await patientFactory.makeDatabasePatient(),
      await clinicianFactory.makeDatabaseClinician(),
    ]);

    const token = jwt.sign({ sub: clinician.id.toString() });

    await request(app.getHttpServer())
      .post(
        `/consultations/clinician/${clinician.id.toString()}/patient/${patient.id.toString()}/`,
      )
      .set('Authorization', `Bearer ${token}`)
      .send({ room: 1, appointmentDate: '2022-01-01T12:00:00.000Z' });

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          recipientId: patient.id.toString(),
        },
      });

      expect(notificationOnDatabase).toBeTruthy();
    });
  });
});
