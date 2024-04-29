import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('Create clinician [E2E]', () => {
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

  test('[POST] /clinicians', async () => {
    const result = await request(app.getHttpServer()).post('/clinicians').send({
      name: 'John',
      surname: 'Doe',
      slug: 'john-doe',
      gender: 'male',
      occupation: 'doctor',
      phoneNumber: '123456789',
      email: 'jonhdoe@email.com',
      password: '12345',
    });

    expect(result.statusCode).toBe(201);

    const clinicianOnDatabase = await prisma.clinician.findUnique({
      where: {
        email: 'jonhdoe@email.com',
      },
    });

    expect(clinicianOnDatabase).toBeTruthy();
  });
});
