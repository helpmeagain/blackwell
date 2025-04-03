import { UniqueEntityId } from "@/domain/value-objects/unique-entity-id/unique-entity-id";

export interface PasswordResetToken {
  id: UniqueEntityId;
  token: string;
  userId: UniqueEntityId;
  userType: 'PATIENT' | 'CLINICIAN';
  expiresAt: Date;
  used: boolean;
}

export abstract class PasswordResetRepository {
  abstract create(token: PasswordResetToken): Promise<void>;
  abstract findByToken(token: string): Promise<PasswordResetToken | null>;
  abstract invalidateToken(id: UniqueEntityId): Promise<void>;
}
