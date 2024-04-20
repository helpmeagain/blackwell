import { NotificationRepository } from '@/application/repositories/notification-repository';
import { Notification } from '@entities/generic/notification';

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = [];

  async create(notification: Notification) {
    this.items.push(notification);
  }
}
