import { Either, left, right } from '@error/either';
import { Notification } from '@entities/generic/notification';
import { NotificationRepository } from '@/application/repositories/notification-repository';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';

interface readNotificationRequest {
  notificationId: string;
  recipientId: string;
}

type readNotificationResponse = Either<
  ResourceNotFound | NotAllowed,
  { notification: Notification }
>;

export class ReadNotificationUseCase {
  constructor(private readonly repository: NotificationRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: readNotificationRequest): Promise<readNotificationResponse> {
    const notification = await this.repository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFound());
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowed());
    }

    notification.read();

    await this.repository.save(notification);
    return right({ notification });
  }
}
