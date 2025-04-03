import { HashGenerator } from "@/application/cryptography/hash-generator";
import { ClinicianRepository } from "@/application/repositories/clinician-repository";
import { PasswordResetRepository } from "@/application/repositories/password-reset-repository";
import { PatientRepository } from "@/application/repositories/patient-repository";
import { ResetPasswordUseCase } from "@/application/use-cases/authenticate/reset-password/reset-password-use-case";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestResetPasswordUseCase extends ResetPasswordUseCase {
  constructor(
    passwordResetTokenRepository: PasswordResetRepository,
    patientRepository: PatientRepository,
    clinicianRepository: ClinicianRepository,
    hashGenerator: HashGenerator
  ) {
    super(
      passwordResetTokenRepository,
      patientRepository,
      clinicianRepository,
      hashGenerator
    );
  }
}