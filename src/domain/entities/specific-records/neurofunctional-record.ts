import { SpecificMedicalRecordProps } from './specific-medical-record';
import { SpecificMedicalRecord } from './specific-medical-record';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Optional } from '@/domain/common/types/optional-type';

export interface NeurofunctionalRecordProps extends SpecificMedicalRecordProps {
  specialNeurofunctionalTests1: string;
  specialNeurofunctionalTests2: string;
}

export class NeurofunctionalRecord extends SpecificMedicalRecord<NeurofunctionalRecordProps> {
  static create(
    props: Optional<NeurofunctionalRecordProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const neurofunctionalRecord = new NeurofunctionalRecord(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return neurofunctionalRecord;
  }

  get specialNeurofunctionalTests1(): string {
    return this.props.specialNeurofunctionalTests1;
  }

  set specialNeurofunctionalTests1(value: string) {
    this.props.specialNeurofunctionalTests1 = value;
    this.touch();
  }

  get specialNeurofunctionalTests2(): string {
    return this.props.specialNeurofunctionalTests2;
  }

  set specialNeurofunctionalTests2(value: string) {
    this.props.specialNeurofunctionalTests2 = value;
    this.touch();
  }
}
