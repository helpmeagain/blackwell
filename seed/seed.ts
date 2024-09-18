import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { ConsultationFactory } from 'test/factories/persistence-factories/make-consultation-database';
import { NotificationFactory } from 'test/factories/persistence-factories/make-notification-database';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/presentation/app.module';
import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { execSync } from 'node:child_process';
import * as readline from 'node:readline';
import { Clinician } from '@/domain/entities/clinician';
import { Patient } from '@/domain/entities/patient';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askConfirmation(question: string): Promise<boolean> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      const normalizedAnswer = answer.toLowerCase().trim();
      if (normalizedAnswer === 'y') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

async function seed() {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule, PersistenceModule],
    providers: [
      ClinicianFactory,
      ConsultationFactory,
      NotificationFactory,
      PatientFactory,
    ],
  }).compile();

  const app: INestApplication = moduleRef.createNestApplication();
  const prisma: PrismaService = moduleRef.get(PrismaService);
  const clinicianFactory = moduleRef.get(ClinicianFactory);
  const consultationFactory = moduleRef.get(ConsultationFactory);
  const notificationFactory = moduleRef.get(NotificationFactory);
  const patientFactory = moduleRef.get(PatientFactory);

  await app.init();

  const confirmed = await askConfirmation(
    'Do you want to clean the database and apply migrations? (y/n)',
  );

  if (confirmed) {
    await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS PUBLIC CASCADE`);
    execSync('pnpm prisma migrate deploy');
  } else {
    console.log('Skipped database cleaning and migrations.');
  }

  const createClinicians = async (count: number) => {
    return Promise.all(
      Array.from({ length: count }, () => clinicianFactory.makeDatabaseClinician()),
    );
  };

  const createPatients = async (count: number) => {
    return Promise.all(
      Array.from({ length: count }, () => patientFactory.makeDatabasePatient()),
    );
  };

  const createConsultations = async (patients: Patient[], clinicians: Clinician[]) => {
    return Promise.all(
      patients.map((patient, index) => {
        const clinician = clinicians[index % clinicians.length];
        return consultationFactory.makeDatabaseConsultation({
          patientId: patient.id,
          clinicianId: clinician.id,
          medicalRecordId: patient.medicalRecord.id,
        });
      }),
    );
  };

  const createNotifications = async (recipients: (Patient | Clinician)[]) => {
    return Promise.all(
      recipients.map((recipient) =>
        notificationFactory.makeDatabaseNotification({
          recipientId: recipient.id,
        }),
      ),
    );
  };

  const clinicians = await createClinicians(3);
  const patients = await createPatients(10);
  await createConsultations(patients, clinicians);
  await createNotifications([...clinicians, ...patients]);

  await app.close();
  rl.close();
}

seed()
  .then(() => {
    console.log('Seed completed');
  })
  .catch((err) => {
    console.error('Error seeding data', err);
  });
