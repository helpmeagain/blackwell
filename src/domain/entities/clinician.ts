import { BaseEntity } from '@domain/common/base-entity';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

export interface ClinicianProps {
  name: string;
  surname: string;
  occupation: string;
}

export class Clinician extends BaseEntity<ClinicianProps> {
  static create(props: ClinicianProps, id?: UniqueEntityId) {
    const clinician = new Clinician(props, id);
    return clinician;
  }

  get name() {
    return this.props.name;
  }

  get surname() {
    return this.props.surname;
  }

  get occupation() {
    return this.props.occupation;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set surname(surname: string) {
    this.props.surname = surname;
  }

  set occupation(occupation: string) {
    this.props.occupation = occupation;
  }
}
