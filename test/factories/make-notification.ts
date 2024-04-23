import { faker } from '@faker-js/faker';
import { Notification, NotificationProps } from '@/domain/entities/generic/notification';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(3),
      message: faker.lorem.sentence(10),
      ...override,
    },
    id,
  );

  return notification;
}
