import { FetchPatientUseCase } from './fetch-patient-use-case';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';

let inMemoryPatient: InMemoryPatientRepository;
let sut: FetchPatientUseCase;

const createPatients = async (count: number, now: Date) => {
  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    await inMemoryPatient.create(makePatient({ createdAt }));
  }
};

describe('Fetch patients', () => {
  beforeEach(() => {
    inMemoryPatient = new InMemoryPatientRepository();
    sut = new FetchPatientUseCase(inMemoryPatient);
  });

  it('should be able to fetch with only the page', async () => {
    const now = new Date();
    await createPatients(25, now);

    const resultPage1 = await sut.execute({
      page: 1,
    });

    const resultPage2 = await sut.execute({
      page: 2,
    });

    expect(resultPage1.isRight()).toBe(true);
    const page1Patients = resultPage1.value?.patients;
    expect(page1Patients).toBeDefined();
    expect(page1Patients).toHaveLength(20);

    expect(resultPage2.isRight()).toBe(true);
    const page2Patients = resultPage2.value?.patients;
    expect(page2Patients).toBeDefined();
    expect(page2Patients).toHaveLength(5);

    if (page1Patients) {
      for (let i = 1; i < page1Patients.length; i++) {
        const currentCreatedAt = page1Patients[i].createdAt.getTime();
        const previousCreatedAt = page1Patients[i - 1].createdAt.getTime();
        expect(currentCreatedAt).toBeLessThanOrEqual(previousCreatedAt);
      }
    }

    if (page2Patients) {
      for (let i = 1; i < page2Patients.length; i++) {
        const currentCreatedAt = page2Patients[i].createdAt.getTime();
        const previousCreatedAt = page2Patients[i - 1].createdAt.getTime();
        expect(currentCreatedAt).toBeLessThanOrEqual(previousCreatedAt);
      }
    }
  });

  it('should be able to fetch with name param and ascending', async () => {
    await inMemoryPatient.create(makePatient({ name: 'AAA' }));
    await inMemoryPatient.create(makePatient({ name: 'CCC' }));
    await inMemoryPatient.create(makePatient({ name: 'BBB' }));

    const result = await sut.execute({
      page: 1,
      orderBy: { field: 'name', direction: 'asc' },
    });

    expect(result.isRight()).toBe(true);
    const patients = result.value?.patients;
    expect(patients).toBeDefined();
    expect(patients).toHaveLength(3);
    expect(patients).toEqual([
      expect.objectContaining({ name: 'AAA' }),
      expect.objectContaining({ name: 'BBB' }),
      expect.objectContaining({ name: 'CCC' }),
    ]);
  });
});
