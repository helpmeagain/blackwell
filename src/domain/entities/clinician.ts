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

  set name(name: string) {
    this.props.name = name;
    this.touch();
  }

  get surname() {
    return this.props.surname;
  }

  set surname(surname: string) {
    this.props.surname = surname;
    this.touch();
  }

  get slug() {
    return this.props.slug;
  }

  get gender(): Gender {
    return this.props.gender;
  }

  set gender(gender: Gender) {
    this.props.gender = gender;
    this.touch();
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber;
    this.touch();
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
    this.touch();
  }

  get occupation() {
    return this.props.occupation;
  }

  set occupation(occupation: string) {
    this.props.occupation = occupation;
    this.touch();
  }
}
