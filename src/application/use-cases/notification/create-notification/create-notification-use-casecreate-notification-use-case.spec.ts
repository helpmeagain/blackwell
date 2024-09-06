import { CreateNotificationUseCase } from './create-notification-use-case';
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository';

let inMemoryRepository: InMemoryNotificationRepository;
let sut: CreateNotificationUseCase;

describe('Create Patient', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryNotificationRepository();
    sut = new CreateNotificationUseCase(inMemoryRepository);
  });

  it('should be able to create a patient', async () => {
    const result = await sut.execute({
      recipientId: '1',
      recipientType: 'CLIENT',
      title: 'A new title!',
      message: 'A new message',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRepository.items[0]).toEqual(result.value?.notification);
  });
});
