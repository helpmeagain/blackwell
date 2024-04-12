import { BaseEntity } from '@domain/common/base-entity';
import { type Optional } from '@domain/common/optional-type';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export interface clinicalConsultationProps {
  clinicianId: UniqueEntityId;
  patientId: UniqueEntityId;
  room: number;
  appointmentDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export class ClinicalConsultation extends BaseEntity<clinicalConsultationProps> {
  static create(
    props: Optional<clinicalConsultationProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const clinicalConsultation = new ClinicalConsultation(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );
    return clinicalConsultation;
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
