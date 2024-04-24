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
    const newClinician = makeClinician({ name: 'Jane' });
    await inMemoryRepository.create(newClinician);

    console.log(newClinician.name);
    const result = await sut.execute({
      clinicianId: newClinician.id.toString(),
      name: 'John',
      surname: 'Doe',
      gender: 'male',
      phoneNumber: '123456789',
      email: 'johndoe@email.com',
      occupation: 'Doctor',
    });
    console.log(newClinician.name);

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value.clinician.name).toEqual('John');
    }
  });
});
