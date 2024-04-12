import { GetClinicalConsultationById } from './get-clinical-consultation-by-id';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';

let inMemoryConsultationRepository: InMemoryConsultationRepository;
let sut: GetClinicalConsultationById;

describe('Get Clinical Consultation By Id', () => {
  beforeEach(() => {
    inMemoryConsultationRepository = new InMemoryConsultationRepository();
    sut = new GetClinicalConsultationById(inMemoryConsultationRepository);
  });

  it('should be able to get a clinical consultation by id', async () => {
    const newClinicalConsultation = makeConsultation();
    await inMemoryConsultationRepository.create(newClinicalConsultation);

    const { clinicalConsultation } = await sut.execute({
      clinicalConsultationId: newClinicalConsultation.id,
    });

    expect(clinicalConsultation.id).toBeTruthy();
    expect(clinicalConsultation.id).toEqual(newClinicalConsultation.id);
  });
});
