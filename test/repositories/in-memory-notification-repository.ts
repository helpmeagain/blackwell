import { NotificationRepository } from '@/application/repositories/notification-repository';
import { Notification } from '@entities/generic/notification';

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = [];

  async findById(id: string) {
    const notification = this.items.find((item) => item.id.toString() === id);

    if (!notification) {
      return null;
    }

    return notification;
  }

  async create(notification: Notification) {
    this.items.push(notification);
  }

  async save(notification: Notification) {
    const index = this.items.findIndex((item) => item.id === notification.id);
    this.items[index] = notification;
  }
}
