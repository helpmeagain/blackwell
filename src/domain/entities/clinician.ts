import { BaseEntity } from '@domain/common/base-entity';
import { UniqueEntityId } from '@domain/value-objects/unique-entity-id/unique-entity-id';
import { Gender } from '../common/types/gender-type';
import { Optional } from '../common/types/optional-type';
import { Slug } from '../value-objects/slug/slug';

export interface ClinicianProps {
  name: string;
  surname: string;
  slug: Slug;
  gender: Gender;
  phoneNumber: string;
  email: string;
  occupation: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Clinician extends BaseEntity<ClinicianProps> {
  static create(
    props: Optional<ClinicianProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const clinician = new Clinician(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name + ' ' + props.surname),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
    return clinician;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  get name() {
    return this.props.name;
  }

  get surname() {
    return this.props.surname;
  }

  get slug() {
    return this.props.slug;
  }

  get gender(): Gender {
    return this.props.gender;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get email(): string {
    return this.props.email;
  }

  get occupation() {
    return this.props.occupation;
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

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
    this.touch();
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  set occupation(occupation: string) {
    this.props.occupation = occupation;
    this.touch();
  }
}
