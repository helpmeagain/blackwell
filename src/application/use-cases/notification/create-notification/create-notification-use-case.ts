import { Either, right } from '@error/either';
import { Notification } from '@entities/generic/notification';
import { NotificationRepository } from '@/application/repositories/notification-repository';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Role } from '@/domain/common/types/role-type';

export interface createNotificationRequest {
  recipientId: string;
  recipientType: Role;
  title: string;
  message: string;
}

export type createNotificationResponse = Either<null, { notification: Notification }>;

export class CreateNotificationUseCase {
  constructor(private readonly repository: NotificationRepository) {}

  async execute({
    recipientId,
    recipientType,
    title,
    message,
  }: createNotificationRequest): Promise<createNotificationResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      recipientType,
      title,
      message,
    });

    await this.repository.create(notification);
    return right({ notification });
  }
}
