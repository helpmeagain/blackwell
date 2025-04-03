import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PasswordResetRepository, PasswordResetToken } from "@/application/repositories/password-reset-repository";
import { UniqueEntityId } from "@/domain/value-objects/unique-entity-id/unique-entity-id";

@Injectable()
export class PrismaPasswordResetTokenRepository implements PasswordResetRepository {
  constructor(private prisma: PrismaService) {}

  async create(token: PasswordResetToken): Promise<void> {
    await this.prisma.passwordResetToken.create({
      data: {
        id: token.id.toString(),
        token: token.token,
        userId: token.userId.toString(),
        userType: token.userType,
        expiresAt: token.expiresAt,
        used: token.used
      }
    });
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    const result = await this.prisma.passwordResetToken.findFirst({
      where: { token }
    });

    if (!result) return null;

    return {
      id: new UniqueEntityId(result.id),
      token: result.token,
      userId: new UniqueEntityId(result.userId),
      userType: result.userType as 'PATIENT' | 'CLINICIAN',
      expiresAt: result.expiresAt,
      used: result.used
    };
  }

  async invalidateToken(id: UniqueEntityId): Promise<void> {
    await this.prisma.passwordResetToken.update({
      where: { id: id.toString() },
      data: { used: true }
    });
  }
}