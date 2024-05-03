import { GetClinicianBySlugUseCase } from './get-clinician-by-slug-use-case';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { makeClinician } from 'test/factories/make-clinician';

let inMemoryRepository: InMemoryClinicianRepository;
let sut: GetClinicianBySlugUseCase;

describe('Get Clinician By slug', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClinicianRepository();
    sut = new GetClinicianBySlugUseCase(inMemoryRepository);
  });

  it('should be able to get a clinician by slug', async () => {
    const newClinician = makeClinician({ name: 'John', surname: 'Doe' });
    await inMemoryRepository.create(newClinician);

    const result = await sut.execute({
      slug: 'john-doe',
    });

    expect(result.isRight()).toBe(true);
  });
});
