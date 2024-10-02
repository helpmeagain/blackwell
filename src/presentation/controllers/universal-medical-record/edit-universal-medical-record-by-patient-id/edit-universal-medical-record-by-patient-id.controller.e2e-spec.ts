import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

describe('Edit universal medical record by id [E2E]', () => {
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

  test('[PUT] /universal-medical-record/by-patient-id/:id', async () => {
    const patients = await patientFactory.makeDatabasePatient();
    const token = jwt.sign({ sub: patients.id.toString() });

    const result = await request(app.getHttpServer())
      .put(
        `/universal-medical-record/by-patient-id/${patients.universalMedicalRecord.patientId.toString()}`,
      )
      .set('Authorization', `Bearer ${token}`)
      .send({
        diagnosis: ['diagnosis1', 'diagnosis2'],
        profession: 'working',
        emergencyContactEmail: 'emergency@email.com',
        emergencyContactNumber: '123456789',
        allergies: ['Peanuts', 'Lactose'],
        maritalStatus: 'single',
        height: 180,
        weight: 80,
        medicationsInUse: ['medicationsInUse1', 'medicationsInUse2'],
      });

    expect(result.statusCode).toBe(200);
    const medicalRecordOnDatabase = await prisma.universalMedicalRecord.findUnique({
      where: {
        id: patients.universalMedicalRecord.id.toString(),
      },
    });
    expect(medicalRecordOnDatabase?.allergies).toBe('allergies');
  });
});
