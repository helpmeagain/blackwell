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
    const { consultation: Consultation } = await sut.execute({
      clinicianId: '1',
      patientId: '1',
      room: 1,
      appointmentDate: new Date(Date.UTC(2021, 0, 1, 0, 0, 0)),
    });

    expect(Consultation.appointmentDate.toISOString()).toEqual(
      '2021-01-01T00:00:00.000Z',
    );
    expect(Consultation.id).toBeTruthy();
    expect(inMemoryRepository.items[0].id).toEqual(Consultation.id);
  });
});
