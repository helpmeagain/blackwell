import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientFactory } from 'test/factories/persistence-factories/make-patient-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { NotificationFactory } from 'test/factories/persistence-factories/make-notification-database';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

describe('Get notification by id [E2E]', () => {
  let app: INestApplication;
  let jwt: JwtService;
  let prisma: PrismaService;
  let patientFactory: PatientFactory;
  let notificationFactory: NotificationFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [NotificationFactory, PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);
    notificationFactory = moduleRef.get(NotificationFactory);
    notificationFactory = moduleRef.get(NotificationFactory);
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test('[PATCH] notification/read/:notificationId', async () => {
    const patient = await patientFactory.makeDatabasePatient();
    const notification = await notificationFactory.makeDatabaseNotification({
      recipientId: patient.id,
    });
    const token = jwt.sign({ sub: patient.id.toString(), role: 'CLIENT' });
    const notificationId = notification.id.toString();

    const result = await request(app.getHttpServer())
      .patch(`/notification/read/${notificationId}/`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toBe(204);

    const notificationOnDatabase = await prisma.notification.findFirst({
      where: {
        recipientId: patient.id.toString(),
      },
    });

    expect(notificationOnDatabase).not.toBeNull();
  });
});
