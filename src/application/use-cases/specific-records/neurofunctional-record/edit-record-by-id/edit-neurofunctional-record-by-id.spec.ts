import { InMemoryNeurofunctionalRecordRepository } from 'test/repositories/in-memory-neurofunctional-record-repository';
import { editNeurofunctionalRecord } from './edit-neurofunctional-record-by-id';
import { makeNeurofunctionalRecord } from 'test/factories/make-neurofunctional-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

let inMemoryRepository: InMemoryNeurofunctionalRecordRepository;
let sut: editNeurofunctionalRecord;

describe('Create Neurofunctional Record', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryNeurofunctionalRecordRepository();
    sut = new editNeurofunctionalRecord(inMemoryRepository);
  });

  it('should be able to create a neurofunctional record', async () => {
    const newNeurofunctional = makeNeurofunctionalRecord({}, new UniqueEntityId('id-1'));
    await inMemoryRepository.create(newNeurofunctional);

    const result = await sut.execute({
      id: 'id-1',
      medicalDiagnosis: 'diagnosis',
      anamnesis: 'anamnesis',
      physicalExamination: 'physical examination',
      triage: 'blue',
      specialNeurofunctionalTests1: 'test1',
      specialNeurofunctionalTests2: 'test2',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items).toHaveLength(1);
    expect(inMemoryRepository.items[0].anamnesis).toBe('anamnesis');
    expect(inMemoryRepository.items[0].specialNeurofunctionalTests1).toBe('test1');
  });
});
