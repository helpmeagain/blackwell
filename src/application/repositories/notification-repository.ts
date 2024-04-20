import { Notification } from '@entities/generic/notification';

export interface NotificationRepository {
  create: (notification: Notification) => Promise<void>;
}
