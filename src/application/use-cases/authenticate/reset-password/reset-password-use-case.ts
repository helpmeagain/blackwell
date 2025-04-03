import { Either, left, right } from "@error/either";
import { PatientRepository } from "@/application/repositories/patient-repository";
import { ClinicianRepository } from "@/application/repositories/clinician-repository";
import { PasswordResetRepository } from "@/application/repositories/password-reset-repository";
import { Patient } from "@/domain/entities/patient";
import { Clinician } from "@/domain/entities/clinician";
import { InvalidToken } from "@/application/common/error-handler/errors/invalid-token";
import { ResourceNotFound } from "@/application/common/error-handler/errors/resource-not-found";
import { HashGenerator } from "@/application/cryptography/hash-generator";

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export type ForgotPasswordResponse = Either<
  InvalidToken | ResourceNotFound,
  { success: boolean }
>;

export class ResetPasswordUseCase {
  constructor(
    private readonly passwordResetTokenRepository: PasswordResetRepository,
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute({ token, newPassword }: ResetPasswordRequest) {
    const resetToken =
      await this.passwordResetTokenRepository.findByToken(token);

    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      return left(new InvalidToken());
    }

    let user: Patient | Clinician | null;

    if (resetToken.userType === "PATIENT") {
      user = await this.patientRepository.findById(
        resetToken.userId.toString()
      );
    } else {
      user = await this.clinicianRepository.findById(
        resetToken.userId.toString()
      );
    }

    if (!user) {
      return left(new ResourceNotFound("User"));
    }

    const hashedPassword = await this.hashGenerator.hash(newPassword);

    if (resetToken.userType === "PATIENT") {
      await this.patientRepository.updatePassword(user.id.toString(), hashedPassword);
    } else {
      await this.clinicianRepository.updatePassword(user.id.toString(), hashedPassword);
    }

    await this.passwordResetTokenRepository.invalidateToken(resetToken.id);
    return right({ success: true });
  }
}
