import { InMemoryNeurofunctionalRecordRepository } from 'test/repositories/in-memory-neurofunctional-record-repository';
import { createNeurofunctionalRecord } from './create-neurofunctional-record';

let inMemoryRepository: InMemoryNeurofunctionalRecordRepository;
let sut: createNeurofunctionalRecord;

describe('Create Neurofunctional Record', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryNeurofunctionalRecordRepository();
    sut = new createNeurofunctionalRecord(inMemoryRepository);
  });

  it('should be able to create a neurofunctional record', async () => {
    const result = await sut.execute({
      clinicianId: '1',
      patientId: '1',
      universalMedicalRecordId: '1',
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
