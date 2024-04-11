import baseEntity from './common/baseEntity';
import { type Optional } from './common/optionalType';
import type UniqueEntityId from './valueObjects/uniqueEntityId/uniqueEntityId';

interface clinicalConsultationProps {
  clinicianId: UniqueEntityId;
  patientId: UniqueEntityId;
  room: number;
  appointmentDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

class ClinicalConsultation extends baseEntity<clinicalConsultationProps> {
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

export default ClinicalConsultation;
