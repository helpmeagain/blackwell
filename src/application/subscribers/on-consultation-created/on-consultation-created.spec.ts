import { makeConsultation } from 'test/factories/make-consultation';
import { OnConsultationCreated } from './on-consultation-created';
import { InMemoryConsultationRepository } from 'test/repositories/in-memory-consultation-repository';

let inMemoryConsultationRepository: InMemoryConsultationRepository;

describe('On consultation created', () => {
  beforeEach(() => {
    inMemoryConsultationRepository = new InMemoryConsultationRepository();
  });

  it('should send a new notification when a consultation is created', async () => {
    const onConsultationCreated = new OnConsultationCreated();
    const consultation = makeConsultation();
    await inMemoryConsultationRepository.create(consultation);
  });
});
