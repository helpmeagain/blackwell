import { Either, right } from '@error/either';
import { Notification } from '@entities/generic/notification';
import { NotificationRepository } from '@/application/repositories/notification-repository';

interface createNotificationRequest {
  recipientId: string;
  title: string;
  message: string;
}

type createNotificationResponse = Either<null, { notification: Notification }>;

export class CreateNotificationUseCase {
  constructor(private readonly repository: NotificationRepository) {}

  async execute({
    recipientId,
    title,
    message,
  }: createNotificationRequest): Promise<createNotificationResponse> {
    const notification = Notification.create({
      recipientId,
      title,
      message,
    });

    await this.repository.create(notification);
    return right({ notification });
  }
}
