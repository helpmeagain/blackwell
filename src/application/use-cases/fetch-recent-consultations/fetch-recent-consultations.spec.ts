import { FetchRecentConsultationUseCase } from './fetch-recent-consultations';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';

let inMemoryRepository: InMemoryConsultationRepository;
let sut: FetchRecentConsultationUseCase;

describe('Fetch recent consultations', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryConsultationRepository();
    sut = new FetchRecentConsultationUseCase(inMemoryRepository);
  });

  it('should be able to fetch recent consultations', async () => {
    await inMemoryRepository.create(
      makeConsultation({ createdAt: new Date(2021, 1, 28) }),
    );
    await inMemoryRepository.create(
      makeConsultation({ createdAt: new Date(2021, 1, 14) }),
    );
    await inMemoryRepository.create(
      makeConsultation({ createdAt: new Date(2021, 1, 24) }),
    );

    const { consultations } = await sut.execute({
      page: 1,
    });

    expect(consultations.length).toBe(3);
    expect(consultations).toEqual([
      expect.objectContaining({ createdAt: new Date(2021, 1, 28) }),
      expect.objectContaining({ createdAt: new Date(2021, 1, 24) }),
      expect.objectContaining({ createdAt: new Date(2021, 1, 14) }),
    ]);
  });

  it('should be able to fetch recent consultations with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(makeConsultation());
    }

    const { consultations } = await sut.execute({
      page: 2,
    });

    expect(consultations).toHaveLength(2);
  });
});
