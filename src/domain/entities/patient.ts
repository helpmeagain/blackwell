import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { Optional } from '../common/types/optional-type';
import { Gender } from '../common/types/gender-type';
import { Slug } from '../value-objects/slug/slug';
import { AggregateRoot } from '../common/aggregate-root';
import { MedicalRecord } from './medical-record';

export interface PatientProps {
  name: string;
  surname: string;
  gender: Gender;
  slug: Slug;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  medicalRecord?: MedicalRecord;
  createdAt: Date;
  updatedAt?: Date;
}

export class Patient extends AggregateRoot<PatientProps> {
  static create(
    props: Optional<PatientProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const patient = new Patient(
      {
        ...props,
        slug: Slug.createFromText(props.name + ' ' + props.surname),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    // Transform into domain event?
    patient.medicalRecord = MedicalRecord.create({ patientId: patient.id });
    return patient;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

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

  get slug(): Slug {
    return this.props.slug;
  }

  get medicalRecord(): MedicalRecord {
    return this.props.medicalRecord as MedicalRecord;
  }

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  set surname(surname: string) {
    this.props.surname = surname;
    this.touch();
  }

  set gender(gender: Gender) {
    this.props.gender = gender;
    this.touch();
  }

  set slug(slug: Slug) {
    this.props.slug = slug;
    this.touch();
  }

  set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate;
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
