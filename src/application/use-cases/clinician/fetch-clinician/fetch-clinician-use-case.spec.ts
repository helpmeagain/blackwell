import { FetchClinicianUseCase } from './fetch-clinician-use-case';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { makeClinician } from 'test/factories/make-clinician';

let inMemoryClinician: InMemoryClinicianRepository;
let sut: FetchClinicianUseCase;

const createClinicians = async (count: number, now: Date) => {
  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    await inMemoryClinician.create(makeClinician({ createdAt }));
  }
};

describe('Fetch clinicians', () => {
  beforeEach(() => {
    inMemoryClinician = new InMemoryClinicianRepository();
    sut = new FetchClinicianUseCase(inMemoryClinician);
  });

  it('should be able to fetch with only the page', async () => {
    const now = new Date();
    await createClinicians(25, now);

    const resultPage1 = await sut.execute({
      page: 1,
    });

    const resultPage2 = await sut.execute({
      page: 2,
    });

    expect(resultPage1.isRight()).toBe(true);
    const page1Clinicians = resultPage1.value?.clinicians;
    expect(page1Clinicians).toBeDefined();
    expect(page1Clinicians).toHaveLength(20);

    expect(resultPage2.isRight()).toBe(true);
    const page2Clinicians = resultPage2.value?.clinicians;
    expect(page2Clinicians).toBeDefined();
    expect(page2Clinicians).toHaveLength(5);

    if (page1Clinicians) {
      for (let i = 1; i < page1Clinicians.length; i++) {
        const currentCreatedAt = page1Clinicians[i].createdAt.getTime();
        const previousCreatedAt = page1Clinicians[i - 1].createdAt.getTime();
        expect(currentCreatedAt).toBeLessThanOrEqual(previousCreatedAt);
      }
    }

    if (page2Clinicians) {
      for (let i = 1; i < page2Clinicians.length; i++) {
        const currentCreatedAt = page2Clinicians[i].createdAt.getTime();
        const previousCreatedAt = page2Clinicians[i - 1].createdAt.getTime();
        expect(currentCreatedAt).toBeLessThanOrEqual(previousCreatedAt);
      }
    }
  });

  it('should be able to fetch with name param and ascending', async () => {
    await inMemoryClinician.create(makeClinician({ name: 'AAA' }));
    await inMemoryClinician.create(makeClinician({ name: 'CCC' }));
    await inMemoryClinician.create(makeClinician({ name: 'BBB' }));

    const result = await sut.execute({
      page: 1,
      orderBy: { field: 'name', direction: 'asc' },
    });

    expect(result.isRight()).toBe(true);
    const clinicians = result.value?.clinicians;
    expect(clinicians).toBeDefined();
    expect(clinicians).toHaveLength(3);
    expect(clinicians).toEqual([
      expect.objectContaining({ name: 'AAA' }),
      expect.objectContaining({ name: 'BBB' }),
      expect.objectContaining({ name: 'CCC' }),
    ]);
  });
});
