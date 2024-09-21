import { GetConsultationByIdUseCase } from './get-consultation-by-id-use-case';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';
import { makeConsultation } from 'test/factories/make-consultation';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { InMemoryUniversalMedicalRecordRepository } from 'test/repositories/in-memory-universal-medical-record-repository';

let inMemoryRepository: InMemoryConsultationRepository;
let inMemoryUniversalMedicalRecordRepository: InMemoryUniversalMedicalRecordRepository;
let sut: GetConsultationByIdUseCase;

describe('Get Consultation By Id', () => {
  beforeEach(() => {
    inMemoryUniversalMedicalRecordRepository =
      new InMemoryUniversalMedicalRecordRepository();
    inMemoryRepository = new InMemoryConsultationRepository(
      inMemoryUniversalMedicalRecordRepository,
    );
    sut = new GetConsultationByIdUseCase(inMemoryRepository);
  });

  it('should be able to get a consultation by id', async () => {
    const newConsultation = makeConsultation({}, new UniqueEntityId('id-1'));
    await inMemoryRepository.create(newConsultation);

    const result = await sut.execute({
      consultationId: 'id-1',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value?.consultation.id).toEqual(newConsultation.id);
    }
  });
});
