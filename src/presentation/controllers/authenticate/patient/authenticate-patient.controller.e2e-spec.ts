import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcryptjs';
import request from 'supertest';

describe('Authenticate patient [E2E]', () => {
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
    await prisma.patient.create({
      data: {
        name: 'John',
        surname: 'Doe',
        slug: 'john-doe',
        gender: 'male',
        birthDate: new Date(),
        cpf: '12345678901',
        phoneNumber: '123456789',
        email: 'jonhdoe@email.com',
        password: await hash('12345', 8),
      },
    });

    const result = await request(app.getHttpServer()).post('/auth/patient').send({
      email: 'jonhdoe@email.com',
      password: '12345',
    });

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      access_token: expect.any(String),
    });
  });
});
