import { EditConsultationByIdUseCase } from './edit-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';

let inMemoryRepository: InMemoryConsultationRepository;
let sut: EditConsultationByIdUseCase;

describe('Edit a consultation By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryConsultationRepository();
    sut = new EditConsultationByIdUseCase(inMemoryRepository);
  });

  it('should be able to edit a consultation by id', async () => {
    const newConsultation = makeConsultation(
      { clinicianId: new UniqueEntityId('clinicianId-1') },
      new UniqueEntityId('consultationId-1'),
    );
    await inMemoryRepository.create(newConsultation);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = await sut.execute({
      consultationId: newConsultation.id.toString(),
      clinicianId: 'clinicianId-1',
      appointmentDate: tomorrow,
      room: 1,
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(inMemoryRepository.items[0].appointmentDate).toEqual(
        result.value?.consultation.appointmentDate,
      );
      expect(inMemoryRepository.items[0].room).toEqual(result.value?.consultation.room);
    }
  });

  it('should not be able to edit a consultation from another user', async () => {
    const newConsultation = makeConsultation(
      { clinicianId: new UniqueEntityId('clinicianId-1') },
      new UniqueEntityId('consultationId-1'),
    );
    await inMemoryRepository.create(newConsultation);

    const newAppointmentDate = new Date(2021, 0, 1, 0, 0, 0);
    const result = await sut.execute({
      consultationId: newConsultation.id.toString(),
      clinicianId: 'clinicianId-2',
      appointmentDate: newAppointmentDate,
      room: 1,
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowed);
  });
});
