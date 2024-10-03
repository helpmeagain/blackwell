import { InMemoryNeurofunctionalRecordRepository } from 'test/repositories/in-memory-neurofunctional-record-repository';
import { GetNeurofunctionalByUniversalRecordIdUseCase } from './get-neurofunctional-record-by-universal-record-id';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { makeNeurofunctionalRecord } from 'test/factories/make-neurofunctional-record';

let inMemoryRepository: InMemoryNeurofunctionalRecordRepository;
let sut: GetNeurofunctionalByUniversalRecordIdUseCase;

describe('Get Neurofunctional Record By Id', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryNeurofunctionalRecordRepository();
    sut = new GetNeurofunctionalByUniversalRecordIdUseCase(inMemoryRepository);
  });

  it('should be able to get a clinician by id', async () => {
    const newNeurofunctional = makeNeurofunctionalRecord({
      universalMedicalRecordId: new UniqueEntityId('id-1'),
    });
    await inMemoryRepository.create(newNeurofunctional);

    const result = await sut.execute({
      universalRecordId: 'id-1',
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(result.value?.neurofunctionalRecord.id).toEqual(newNeurofunctional.id);
      console.log(result.value?.neurofunctionalRecord);
    }
  });
});
