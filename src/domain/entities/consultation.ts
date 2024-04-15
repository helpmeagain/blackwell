import { BaseEntity } from '@domain/common/base-entity';
import { type Optional } from '@/domain/common/types/optional-type';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export interface consultationProps {
  clinicianId: UniqueEntityId;
  patientId: UniqueEntityId;
  room: number;
  appointmentDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export class Consultation extends BaseEntity<consultationProps> {
  static create(props: Optional<consultationProps, 'createdAt'>, id?: UniqueEntityId) {
    const consultation = new Consultation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return consultation;
  }

  // Getters //
  get clinicianId() {
    return this.props.clinicianId;
  }

  get patientId() {
    return this.props.patientId;
  }

  get room() {
    return this.props.room;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get appointmentDate() {
    return this.props.appointmentDate;
  }

  // Setter //
  private touch() {
    this.props.updatedAt = new Date();
  }

  set appointmentDate(appointmentDate: Date) {
    this.props.appointmentDate = appointmentDate;
    this.touch();
  }

  set room(room: number) {
    this.props.room = room;
    this.touch();
  }
}
