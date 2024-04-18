import { BaseEntity } from '../common/base-entity';
import { Optional } from '../common/types/optional-type';
import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';

interface MedicalRecordProps {
  patientId: UniqueEntityId;
  consultationId?: UniqueEntityId[];
  diagnosis?: string;
  comorbidity?: string;
}

export class MedicalRecord extends BaseEntity<MedicalRecordProps> {
  static create(
    props: Optional<MedicalRecordProps, 'consultationId' | 'diagnosis' | 'comorbidity'>,
    id?: UniqueEntityId,
  ) {
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

  get comorbidity() {
    return this.props.comorbidity;
  }
}
