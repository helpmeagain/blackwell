import { CreateConsultationUseCase } from './create-consultation-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';

let inMemoryRepository: InMemoryConsultationRepository;
let sut: CreateConsultationUseCase;

describe('Schedule Consultation', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryConsultationRepository();
    sut = new CreateConsultationUseCase(inMemoryRepository);
  });

  it('should be able to schedule a consultation', async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = await sut.execute({
      clinicianId: '1',
      patientId: '1',
      room: 1,
      appointmentDate: tomorrow,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items.length).toEqual(1);
    expect(inMemoryRepository.items[0]).toEqual(result.value?.consultation);
    expect(inMemoryRepository.items[0].clinicianId.toString()).toEqual(
      result.value?.consultation.clinicianId.toString(),
    );
    expect(inMemoryRepository.items[0].id).toEqual(result.value?.consultation.id);
  });
});
