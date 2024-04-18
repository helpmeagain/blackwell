import { EditClinicianByIdUseCase } from './edit-clinician-by-id-use-case';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { makeClinician } from 'test/factories/make-clinician';

let inMemoryRepository: InMemoryClinicianRepository;
let sut: EditClinicianByIdUseCase;

describe('Edit a clinician By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClinicianRepository();
    sut = new EditClinicianByIdUseCase(inMemoryRepository);
  });

  it('should be able to edit a clinician by id', async () => {
    const newClinician = makeClinician({});
    await inMemoryRepository.create(newClinician);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = await sut.execute({
      clinicianId: newClinician.id.toString(),
      name: 'John',
      surname: 'Doe',
      occupation: 'Doctor',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.clinician.name).toBe('John');
      expect(result.value.clinician.surname).toBe('Doe');
      expect(result.value.clinician.occupation).toBe('Doctor');
    }
  });
});
