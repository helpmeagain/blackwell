import { AppModule } from "@/presentation/app.module";
import { INestApplication } from "@nestjs/common";
import { ClinicianFactory } from "test/factories/persistence-factories/make-clinician-database";
import { Test } from "@nestjs/testing";
import { hash } from "bcryptjs";
import request from "supertest";
import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";

describe("Authenticate clinician [E2E]", () => {
  let app: INestApplication;
  let clinicianFactory: ClinicianFactory;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule],
      providers: [ClinicianFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    clinicianFactory = moduleRef.get(ClinicianFactory);
    await app.init();
  });

  test("[POST] /clinicians", async () => {
    const user = await clinicianFactory.makeDatabaseClinician({
      email: "johndoe@example.com",
      password: await hash("12345", 8),
    });

    const result = await request(app.getHttpServer())
      .post("/auth/clinician")
      .send({
        email: "johndoe@example.com",
        password: "12345",
      });

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
      access_token: expect.any(String),
      role: "CLINICIAN",
      user_id: user.id.toString(),
    });
  });
});
