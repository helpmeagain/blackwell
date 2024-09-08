import { NotificationRepository } from '@/application/repositories/notification-repository';
import { CreateNotificationUseCase } from '@/application/use-cases/notification/create-notification/create-notification-use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestCreateNotificationUseCase extends CreateNotificationUseCase {
  constructor(repository: NotificationRepository) {
    super(repository);
  }
}
