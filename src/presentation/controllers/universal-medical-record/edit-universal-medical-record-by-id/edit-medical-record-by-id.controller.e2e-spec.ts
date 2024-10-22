import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import request from 'supertest';

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

  test('[PUT] /universal-medical-record/:id', async () => {
    const patients = await patientFactory.makeDatabasePatient();
    const token = jwt.sign({ sub: patients.id.toString(), role: 'CLIENT' });

    const result = await request(app.getHttpServer())
      .put(`/universal-medical-record/${patients.universalMedicalRecord.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        diagnosis: ['diagnosis1', 'diagnosis2'],
        profession: 'working',
        emergencyContactEmail: 'emergency@email.com',
        emergencyContactNumber: '123456789',
        maritalStatus: 'single',
        height: 180,
        weight: 80,
        allergies: ['Peanuts', 'Lactose'],
        medicationsInUse: ['medicationsInUse1', 'medicationsInUse2'],
      });

    expect(result.statusCode).toBe(200);
    const editedMedicalRecordOnDatabase = await prisma.universalMedicalRecord.findUnique({
      where: {
        id: patients.universalMedicalRecord.id.toString(),
      },
    });

    expect(editedMedicalRecordOnDatabase?.maritalStatus).toEqual('single');
  });
});
