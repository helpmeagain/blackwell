import { EditConsultationByIdUseCase } from './edit-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

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

    const newAppointmentDate = new Date(2021, 0, 1, 0, 0, 0);
    await sut.execute({
      consultationId: newConsultation.id.toString(),
      clinicianId: 'clinicianId-1',
      appointmentDate: newAppointmentDate,
      room: 1,
    });

    expect(inMemoryRepository.items[0]).toMatchObject({
      appointmentDate: newAppointmentDate,
      room: 1,
    });
  });

  it('should not be able to edit a consultation from another user', async () => {
    const newConsultation = makeConsultation(
      { clinicianId: new UniqueEntityId('clinicianId-1') },
      new UniqueEntityId('consultationId-1'),
    );
    await inMemoryRepository.create(newConsultation);

    const newAppointmentDate = new Date(2021, 0, 1, 0, 0, 0);
    expect(() => {
      return sut.execute({
        consultationId: newConsultation.id.toString(),
        clinicianId: 'clinicianId-2',
        appointmentDate: newAppointmentDate,
        room: 1,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
