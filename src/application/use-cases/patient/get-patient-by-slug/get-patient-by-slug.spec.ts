import { GetPatientBySlugUseCase } from './get-patient-by-slug';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { makePatient } from 'test/factories/make-patient';

let inMemoryRepository: InMemoryPatientRepository;
let sut: GetPatientBySlugUseCase;

describe('Get Patient By Slug', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryPatientRepository();
    sut = new GetPatientBySlugUseCase(inMemoryRepository);
  });

  it('should be able to get a patient by slug', async () => {
    const newPatient = makePatient({ name: 'John', surname: 'Doe' });
    await inMemoryRepository.create(newPatient);

    const result = await sut.execute({
      slug: 'john-doe',
    });

    expect(result.isRight()).toBe(true);
  });

  it('should be able to get a patient by slug', async () => {
    const newPatient = makePatient({ name: 'Maria', surname: 'Assunção' });
    await inMemoryRepository.create(newPatient);

    const result = await sut.execute({
      slug: 'maria-assuncao',
    });

    expect(result.isRight()).toBe(true);
  });
});
