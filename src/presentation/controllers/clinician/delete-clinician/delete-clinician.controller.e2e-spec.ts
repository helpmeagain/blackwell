import { PersistenceModule } from '@/infrastructure/persistence/persistence.module';
import { AppModule } from '@/presentation/app.module';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClinicianFactory } from 'test/factories/persistence-factories/make-clinician-database';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

describe('Delete clinician by id [E2E]', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;
  let clinicianFactory: ClinicianFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [ClinicianFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService);
    prisma = moduleRef.get(PrismaService);
    clinicianFactory = moduleRef.get(ClinicianFactory);
    await app.init();
  });

  test('[DELETE] /clinicians/:id', async () => {
    const clinician = await clinicianFactory.makeDatabaseClinician({});
    const token = jwt.sign({ sub: clinician.id.toString() });

    const result = await request(app.getHttpServer())
      .delete(`/clinicians/${clinician.id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(result.statusCode).toBe(204);

    const clinicianOnDatabase = await prisma.clinician.findUnique({
      where: {
        email: clinician.email,
      },
    });

    expect(clinicianOnDatabase).toBeNull();
  });
});
