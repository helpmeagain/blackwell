import { NotificationRepository } from '@/application/repositories/notification-repository';
import { Notification } from '@/domain/entities/generic/notification';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification);
    await this.prisma.notification.create({ data });
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistence(notification);
    await this.prisma.notification.update({ where: { id: data.id }, data });
  }
}
