import { Notification } from '@/domain/entities/generic/notification';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Notification as PrismaNotification, Prisma } from '@prisma/client';

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        title: raw.title,
        message: raw.content,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
        recipientId: new UniqueEntityId(raw.recipientId),
        recipientType: raw.recipientType,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.toString(),
      title: notification.title,
      content: notification.message,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      recipientId: notification.recipientId.toString(),
      recipientType: notification.recipientType,
    };
  }
}
