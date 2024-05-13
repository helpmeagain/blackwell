import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create patient [E2E]', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  test('[POST] /patients', async () => {
    const result = await request(app.getHttpServer()).post('/patients').send({
      name: 'John',
      surname: 'Doe',
      slug: 'john-doe',
      gender: 'male',
      birthDate: '2000-01-01T12:00:00.000Z',
      phoneNumber: '123456789',
      email: 'jonhdoe@email.com',
      password: '12345',
    });

    expect(result.statusCode).toBe(201);

    const patientOnDatabase = await prisma.patient.findUnique({
      where: {
        email: 'jonhdoe@email.com',
      },
    });

    const medicalRecordOnDatabase = await prisma.medicalRecord.findUnique({
      where: {
        patientId: result.body.patient.id,
      },
    });

    expect(patientOnDatabase).toBeTruthy();
    expect(medicalRecordOnDatabase).toBeTruthy();
  });
});
