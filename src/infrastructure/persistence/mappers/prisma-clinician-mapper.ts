import { Gender } from '@/domain/common/types/gender-type';
import { Clinician } from '@/domain/entities/clinician';
import { UniqueEntityId } from '@/domain/value-objects/unique-entity-id/unique-entity-id';
import { Clinician as PrismaClinician } from '@prisma/client';

export class PrismaClinicianMapper {
  static toDomain(raw: PrismaClinician): Clinician {
    return Clinician.create(
      {
        name: raw.name,
        surname: raw.surname,
        gender: raw.gender as Gender,
        phoneNumber: raw.phoneNumber,
        email: raw.email,
        occupation: raw.occupation,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }
}
