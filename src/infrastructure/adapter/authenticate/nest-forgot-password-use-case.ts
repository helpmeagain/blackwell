import { PatientRepository } from "@/application/repositories/patient-repository";
import { ClinicianRepository } from "@/application/repositories/clinician-repository";
import { TokenGenerator } from "@/application/cryptography/token-generator";
import { EmailSender } from "@/application/cryptography/email-sender";
import { Injectable } from "@nestjs/common";
import { ForgotPasswordUseCase } from "@/application/use-cases/authenticate/forgot-password/forgot-password-use-case";
import { PasswordResetRepository } from "@/application/repositories/password-reset-repository";

@Injectable()
export class NestForgotPasswordUseCase extends ForgotPasswordUseCase {
  constructor(
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
    passwordResetTokenRepository: PasswordResetRepository,
    tokenGenerator: TokenGenerator,
    emailSender: EmailSender
  ) {
    super(
      patientRepository,
      clinicianRepository,
      passwordResetTokenRepository,
      tokenGenerator,
      emailSender
    );
  }
}
