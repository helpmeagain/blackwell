import { BaseEntity } from '../common/base-entity';
import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';

interface MedicalRecordProps {
  patientId: string;
  consultationId: string[];
  diagnosis: string;
}

export class MedicalRecord extends BaseEntity<MedicalRecordProps> {
  static create(props: MedicalRecordProps, id?: UniqueEntityId) {
    const record = new MedicalRecord(props, id);
    return record;
  }

  get patientId() {
    return this.props.patientId;
  }

  get consultationId() {
    return this.props.consultationId;
  }

  get diagnosis() {
    return this.props.diagnosis;
  }
}
