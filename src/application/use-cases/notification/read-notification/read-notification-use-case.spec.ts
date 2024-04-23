import { ReadNotificationUseCase } from './read-notification-use-case';
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository';
import { makeNotification } from 'test/factories/make-notification';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';

let inMemoryRepository: InMemoryNotificationRepository;
let sut: ReadNotificationUseCase;

describe('Read notification', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryNotificationRepository();
    sut = new ReadNotificationUseCase(inMemoryRepository);
  });

  it('should be able to get a notification by id', async () => {
    const newNotification = makeNotification();
    await inMemoryRepository.create(newNotification);

    const result = await sut.execute({
      recipientId: newNotification.recipientId.toString(),
      notificationId: newNotification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight()) {
      expect(inMemoryRepository.items[0].createdAt).toEqual(expect.any(Date));
    }
  });

  it('should not be able to delete a notification from another user', async () => {
    const newNotification = makeNotification({
      recipientId: new UniqueEntityId('recipientId-1'),
    });
    await inMemoryRepository.create(newNotification);

    const result = await sut.execute({
      recipientId: 'recipientId-2',
      notificationId: newNotification.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowed);
  });
});
