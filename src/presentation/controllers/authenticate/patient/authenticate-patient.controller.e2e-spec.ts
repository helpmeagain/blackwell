import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { AppModule } from "@/presentation/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from "supertest";
import { PatientFactory } from "test/factories/persistence-factories/make-patient-database";

describe("Authenticate patient [E2E]", () => {
  let app: INestApplication;
  let patientFactory: PatientFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    patientFactory = moduleRef.get(PatientFactory);
    await app.init();
  });

  test("[POST] /patients", async () => {
    const user = await patientFactory.makeDatabasePatient({
      email: "jonhdoe@email.com",
      password: await hash("12345", 8),
    });

    const result = await request(app.getHttpServer())
      .post("/auth/patient")
      .send({
        email: "jonhdoe@email.com",
        password: "12345",
      });

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      access_token: expect.any(String),
      role: "PATIENT",
      user_id: user.id.toString(),
    });
  });
});
