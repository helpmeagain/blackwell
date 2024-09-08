import { Notification, NotificationProps } from '@/domain/entities/generic/notification';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { makeNotification } from '../make-notification';
import { PrismaNotificationMapper } from '@/infrastructure/persistence/prisma/mappers/prisma-notification-mapper';

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makeDatabaseNotification(
    data: Partial<NotificationProps> = {},
  ): Promise<Notification> {
    const notification = makeNotification(data);

    await this.prisma.notification.create({
      data: PrismaNotificationMapper.toPersistence(notification),
    });

    return notification;
  }
}
