import { FetchRecentConsultationUseCase } from './fetch-recent-consultations-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { InMemoryUniversalMedicalRecordRepository } from 'test/repositories/in-memory-universal-medical-record-repository';

let inMemoryRepository: InMemoryConsultationRepository;
let inMemoryUniversalMedicalRecordRepository: InMemoryUniversalMedicalRecordRepository;
let sut: FetchRecentConsultationUseCase;

describe('Fetch recent result', () => {
  beforeEach(() => {
    inMemoryUniversalMedicalRecordRepository =
      new InMemoryUniversalMedicalRecordRepository();
    inMemoryRepository = new InMemoryConsultationRepository(
      inMemoryUniversalMedicalRecordRepository,
    );
    sut = new FetchRecentConsultationUseCase(inMemoryRepository);
  });

  it('should be able to fetch recent result', async () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

    const threeWeeksLater = new Date();
    threeWeeksLater.setDate(threeWeeksLater.getDate() + 21);

    await inMemoryRepository.create(makeConsultation({ createdAt: nextWeek }));
    await inMemoryRepository.create(makeConsultation({ createdAt: threeWeeksLater }));
    await inMemoryRepository.create(makeConsultation({ createdAt: twoWeeksLater }));

    const result = await sut.execute({
      page: 1,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.consultations).toHaveLength(3);
    expect(result.value?.consultations).toEqual([
      expect.objectContaining({ createdAt: threeWeeksLater }),
      expect.objectContaining({ createdAt: twoWeeksLater }),
      expect.objectContaining({ createdAt: nextWeek }),
    ]);
  });

  it('should be able to fetch recent result with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(makeConsultation());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.consultations).toHaveLength(2);
  });
});
