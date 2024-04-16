import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { AggregateRoot } from '../common/aggregate-root';
import { Optional } from '../common/types/optional-type';
import { Gender } from '../common/types/gender-type';
import { MedicalRecord } from './medical-record';
import { Slug } from '../value-objects/slug/slug';

interface PatientProps {
  name: string;
  surname: string;
  gender: Gender;
  slug: Slug;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  medicalRecord: MedicalRecord;
  createdAt: Date;
  updatedAt?: Date;
}

export class Patient extends AggregateRoot<PatientProps> {
  static create(
    props: Optional<PatientProps, 'createdAt' | 'slug' | 'medicalRecord'>,
    id?: UniqueEntityId,
  ) {
    const patient = new Patient(
      {
        ...props,
        slug: Slug.createFromText(props.name + props.surname),
        medicalRecord: props.medicalRecord ?? MedicalRecord.create({ patientId: id! }),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return patient;
  }

  // Getters //
  get name(): string {
    return this.props.name;
  }

  get surname(): string {
    return this.props.surname;
  }

  get gender(): Gender {
    return this.props.gender;
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get email(): string {
    return this.props.email;
  }

  get medicalRecord(): MedicalRecord {
    return this.props.medicalRecord;
  }

  // Setter //
  private touch() {
    this.props.updatedAt = new Date();
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set gender(gender: Gender) {
    this.props.gender = gender;
    this.touch();
  }

  set surname(surname: string) {
    this.props.surname = surname;
    this.touch();
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  set medicalRecord(medicalRecord: MedicalRecord) {
    this.props.medicalRecord = medicalRecord;
    this.touch();
  }
}
