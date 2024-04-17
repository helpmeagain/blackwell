import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { Optional } from '../common/types/optional-type';
import { Gender } from '../common/types/gender-type';
import { Slug } from '../value-objects/slug/slug';
import { BaseEntity } from '../common/base-entity';

export interface PatientProps {
  name: string;
  surname: string;
  gender: Gender;
  slug: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Patient extends BaseEntity<PatientProps> {
  static create(
    props: Optional<PatientProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const patient = new Patient(
      {
        ...props,
        slug: Slug.createFromText(props.name + ' ' + props.surname).value,
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
}
