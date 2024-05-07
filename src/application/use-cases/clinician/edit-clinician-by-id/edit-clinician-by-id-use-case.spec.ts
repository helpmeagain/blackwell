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

    const result = await sut.execute({
      clinicianId: newClinician.id.toString(),
      name: 'John',
      surname: 'Doe',
      gender: 'male',
      phoneNumber: '123456789',
      email: 'johndoe@email.com',
      password: '123456',
      occupation: 'Doctor',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items[0].name).toEqual('John');
    expect(inMemoryRepository.items[0].email).toEqual('johndoe@email.com');
  });
});
