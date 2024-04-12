import { ClinicalConsultation } from '@entities/clinical-consultation';
import { GetClinicalConsultationById } from './get-clinical-consultation-by-id';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryConsultationRepository: InMemoryConsultationRepository;
let sut: GetClinicalConsultationById;

describe('Get Clinical Consultation By Id', () => {
  beforeEach(() => {
    inMemoryConsultationRepository = new InMemoryConsultationRepository();
    sut = new GetClinicalConsultationById(inMemoryConsultationRepository);
  });

  it('should be able to get a clinical consultation by id', async () => {
    const newClinicalConsultation = ClinicalConsultation.create({
      clinicianId: new UniqueEntityId(),
      patientId: new UniqueEntityId(),
      room: 1,
      appointmentDate: new Date(Date.UTC(2021, 0, 1, 0, 0, 0)),
    });

    await inMemoryConsultationRepository.create(newClinicalConsultation);

    const { clinicalConsultation } = await sut.execute({
      id: newClinicalConsultation.id,
    });

    expect(clinicalConsultation.id).toBeTruthy();
    expect(clinicalConsultation.id).toEqual(newClinicalConsultation.id);
  });
});
