import { baseEntity } from '@domain/common/base-entity';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';

interface ClinicianProps {
  name: string;
  surname: string;
  occupation: string;
}

export class Clinician extends baseEntity<ClinicianProps> {
  static create(props: ClinicianProps, id?: UniqueEntityId) {
    const clinician = new Clinician(props, id);
    return clinician;
  }
}
