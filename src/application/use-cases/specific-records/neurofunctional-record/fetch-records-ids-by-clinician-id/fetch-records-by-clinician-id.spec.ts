import { FetchNeurofunctionalIdsByClinicianIdUseCase } from './fetch-records-by-clinician-id';
import { InMemoryClinicianRepository } from 'test/repositories/in-memory-clinician-repository';
import { makeClinician } from 'test/factories/make-clinician';
import { InMemoryPatientRepository } from 'test/repositories/in-memory-patient-repository';
import { InMemoryNeurofunctionalRecordRepository } from 'test/repositories/in-memory-neurofunctional-record-repository';
import { makePatient } from 'test/factories/make-patient';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { makeNeurofunctionalRecord } from 'test/factories/make-neurofunctional-record';

let inMemoryClinician: InMemoryClinicianRepository;
let inMemoryPatient: InMemoryPatientRepository;
let inMemoryNeurofunctionalRecord: InMemoryNeurofunctionalRecordRepository;
let sut: FetchNeurofunctionalIdsByClinicianIdUseCase;

const createPatientsAndRecords = async (
  count: number,
  now: Date,
  clinicianId: UniqueEntityId,
) => {
  for (let i = 1; i <= count; i++) {
    const createdAt = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const patient = makePatient();
    await inMemoryPatient.create(patient);
    const record = makeNeurofunctionalRecord({
      clinicianId: clinicianId,
      patientId: patient.id,
      universalMedicalRecordId: patient.universalMedicalRecord.id,
      createdAt,
    });
    await inMemoryNeurofunctionalRecord.create(record);
  }
};

describe('Fetch records ids by clinician id', () => {
  beforeEach(() => {
    inMemoryClinician = new InMemoryClinicianRepository();
    inMemoryPatient = new InMemoryPatientRepository();
    inMemoryNeurofunctionalRecord = new InMemoryNeurofunctionalRecordRepository();
    sut = new FetchNeurofunctionalIdsByClinicianIdUseCase(
      inMemoryNeurofunctionalRecord,
      inMemoryPatient,
    );
  });

  it('should be able to fetch with only the page', async () => {
    const clinician = makeClinician();
    await inMemoryClinician.create(clinician);

    const now = new Date();
    await createPatientsAndRecords(25, now, clinician.id);

    const resultPage1 = await sut.execute({
      clinicianId: clinician.id.toString(),
      page: 1,
    });

    const resultPage2 = await sut.execute({
      clinicianId: clinician.id.toString(),
      page: 2,
    });

    expect(resultPage1.isRight()).toBe(true);
    if (resultPage1.isRight()) {
      const page1Clinicians = resultPage1.value.records;
      expect(page1Clinicians).toBeDefined();
      expect(page1Clinicians).toHaveLength(20);
    }

    expect(resultPage2.isRight()).toBe(true);
    if (resultPage2.isRight()) {
      const page2Clinicians = resultPage2.value.records;
      expect(page2Clinicians).toBeDefined();
      expect(page2Clinicians).toHaveLength(5);
    }

    // if (page1Clinicians) {
    //   for (let i = 1; i < page1Clinicians.length; i++) {
    //     const currentCreatedAt = page1Clinicians[i].createdAt.getTime();
    //     const previousCreatedAt = page1Clinicians[i - 1].createdAt.getTime();
    //     expect(currentCreatedAt).toBeLessThanOrEqual(previousCreatedAt);
    //   }
    // }

    // if (page2Clinicians) {
    //   for (let i = 1; i < page2Clinicians.length; i++) {
    //     const currentCreatedAt = page2Clinicians[i].createdAt.getTime();
    //     const previousCreatedAt = page2Clinicians[i - 1].createdAt.getTime();
    //     expect(currentCreatedAt).toBeLessThanOrEqual(previousCreatedAt);
    //   }
    // }
  });
});
