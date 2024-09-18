import { fakerPT_BR as faker } from '@faker-js/faker';
import { Notification, NotificationProps } from '@/domain/entities/generic/notification';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId,
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      recipientType: Math.random() < 0.5 ? 'EMPLOYEE' : 'CLIENT',
      title: faker.lorem.sentence(3),
      message: faker.lorem.sentence(10),
      ...override,
    },
    id,
  );

  return notification;
}
