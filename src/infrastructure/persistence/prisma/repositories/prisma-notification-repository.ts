import { NotificationRepository } from '@/application/repositories/notification-repository';
import { Notification } from '@/domain/entities/generic/notification';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  findById(id: string): Promise<Notification | null> {
    throw new Error('not implemented');
  }

  create(notification: Notification): Promise<void> {
    throw new Error('not implemented');
  }

  save(notification: Notification): Promise<void> {
    throw new Error('not implemented');
  }
}
