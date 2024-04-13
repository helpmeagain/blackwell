import { GetConsultationByIdUseCase } from './get-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryConsultationRepository: InMemoryConsultationRepository;
let sut: GetConsultationByIdUseCase;

describe('Get Consultation By Id', () => {
  beforeEach(() => {
    inMemoryConsultationRepository = new InMemoryConsultationRepository();
    sut = new GetConsultationByIdUseCase(inMemoryConsultationRepository);
  });

  it('should be able to get a consultation by id', async () => {
    const newConsultation = makeConsultation({}, new UniqueEntityId('id-1'));
    await inMemoryConsultationRepository.create(newConsultation);

    const { consultation } = await sut.execute({
      consultationId: 'id-1',
    });

    expect(consultation.id).toBeTruthy();
    expect(consultation.id).toEqual(newConsultation.id);
  });
});
