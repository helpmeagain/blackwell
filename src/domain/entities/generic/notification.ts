import { BaseEntity } from '@/domain/common/base-entity';
import { Optional } from '@/domain/common/types/optional-type';
import { Role } from '@/domain/common/types/role-type';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';

export interface NotificationProps {
  recipientId: UniqueEntityId;
  recipientType: Role;
  title: string;
  message: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification extends BaseEntity<NotificationProps> {
  static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityId) {
    const notification = new Notification(
      { ...props, createdAt: props.createdAt ?? new Date() },
      id,
    );
    return notification;
  }

  read() {
    this.props.readAt = new Date();
  }

  get recipientId() {
    return this.props.recipientId;
  }

  get recipientType() {
    return this.props.recipientType;
  }

  get title() {
    return this.props.title;
  }

  get message() {
    return this.props.message;
  }

  get readAt() {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
