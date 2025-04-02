import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { AppModule } from "@/presentation/app.module";
import { INestApplication } from "@nestjs/common";
import { PatientFactory } from "test/factories/persistence-factories/make-patient-database";
import { Test } from "@nestjs/testing";
import { CacheRepository } from "@/infrastructure/cache/cache-repository";
import { CacheModule } from "@/infrastructure/cache/cache.module";
import { PatientRepository } from "@/application/repositories/patient-repository";
import { PrismaPatientMapper } from "../mappers/prisma-patient-mapper";

describe("Prisma patient repository [E2E]", () => {
  let app: INestApplication;
  let patientFactory: PatientFactory;
  let cacheRepository: CacheRepository;
  let patientRepository: PatientRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PersistenceModule, CacheModule],
      providers: [PatientFactory],
    }).compile();

    app = moduleRef.createNestApplication();
    patientFactory = moduleRef.get(PatientFactory);
    cacheRepository = moduleRef.get(CacheRepository);
    patientRepository = moduleRef.get(PatientRepository);
    await app.init();
  });

  it("should cache patient by id", async () => {
    const patient = await patientFactory.makeDatabasePatient({});
    const patientId = patient.id.toString();
    const getPatientByIdResponse = await patientRepository.findById(patientId);

    const cached = await cacheRepository.get(`patient:${patientId}`);
    const persistenceData = PrismaPatientMapper.toPersistence(getPatientByIdResponse!);
    expect(cached).toEqual(JSON.stringify(persistenceData));
  });

  it("should return cached patient on subsequent calls", async () => {
    const patient = await patientFactory.makeDatabasePatient({ name: "Original Name" });
    const patientId = patient.id.toString();

    const modifiedPersistenceData = {
      ...patient,
      name: "Cached Name",
    };

    await cacheRepository.set(
      `patient:${patientId}`,
      JSON.stringify(modifiedPersistenceData),
    );

    const getPatientByIdResponse = await patientRepository.findById(patientId);
    expect(getPatientByIdResponse!.name).toEqual("Cached Name");
  });

  it("should reset cached patient when saving", async () => {
    const patient = await patientFactory.makeDatabasePatient({});
    const patientId = patient.id.toString();

    await cacheRepository.set(
      `patient:${patientId}`,
      JSON.stringify({ empty: true })
    );
    await patientRepository.save(patient);
    const cached = await cacheRepository.get(`patient:${patientId}`);
    expect(cached).toBeNull();
  });
});
