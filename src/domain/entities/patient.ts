import { baseEntity } from '@domain/common/base-entity';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

interface PatientProps {
  name: string;
  surname: string;
}

export class Patient extends baseEntity<PatientProps> {
  static create(props: PatientProps, id?: UniqueEntityId) {
    const patient = new Patient(props, id);
    return patient;
  }
}
