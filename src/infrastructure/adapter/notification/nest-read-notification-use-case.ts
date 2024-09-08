import { NotificationRepository } from '@/application/repositories/notification-repository';
import { ReadNotificationUseCase } from '@/application/use-cases/notification/read-notification/read-notification-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestReadNotificationUseCase extends ReadNotificationUseCase {
  constructor(repository: NotificationRepository) {
    super(repository);
  }
}
