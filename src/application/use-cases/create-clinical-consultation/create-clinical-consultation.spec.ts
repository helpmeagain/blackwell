import { CreateClinicalConsultation } from './create-clinical-consultation';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';

let inMemoryClinicalConsultationRepository: InMemoryConsultationRepository;
let sut: CreateClinicalConsultation;

describe('Schedule Clinical Consultation', () => {
  beforeEach(() => {
    inMemoryClinicalConsultationRepository = new InMemoryConsultationRepository();
    sut = new CreateClinicalConsultation(inMemoryClinicalConsultationRepository);
  });

  it('should be able to schedule a clinical consultation', async () => {
    const { clinicalConsultation } = await sut.execute({
      clinicianId: '1',
      patientId: '1',
      room: 1,
      appointmentDate: new Date(Date.UTC(2021, 0, 1, 0, 0, 0)),
    });

    expect(clinicalConsultation.appointmentDate.toISOString()).toEqual(
      '2021-01-01T00:00:00.000Z',
    );
    expect(clinicalConsultation.id).toBeTruthy();
    expect(inMemoryClinicalConsultationRepository.items[0].id).toEqual(
      clinicalConsultation.id,
    );
  });
});
