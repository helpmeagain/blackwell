import { Either, right } from "@error/either";
import { PatientRepository } from "@/application/repositories/patient-repository";
import { ClinicianRepository } from "@/application/repositories/clinician-repository";
import { TokenGenerator } from "@/application/cryptography/token-generator";
import { EmailSender } from "@/application/cryptography/email-sender";
import { PasswordResetRepository } from "@/application/repositories/password-reset-repository";
import { UniqueEntityId } from "@/domain/value-objects/unique-entity-id/unique-entity-id";

interface ForgotPasswordRequest {
  email: string;
}

type ForgotPasswordResponse = Either<null, { success: boolean }>;

export class ForgotPasswordUseCase {
  constructor(
    private readonly patientRepository: PatientRepository,
    private readonly clinicianRepository: ClinicianRepository,
    private readonly passwordResetTokenRepository: PasswordResetRepository,
    private readonly tokenGenerator: TokenGenerator,
    private readonly emailSender: EmailSender
  ) {}

  async execute({
    email,
  }: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const [patient, clinician] = await Promise.all([
      this.patientRepository.findByEmail(email),
      this.clinicianRepository.findByEmail(email),
    ]);

    const user = patient || clinician;

    if (user) {
      const resetToken = await this.tokenGenerator.generate();
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      await this.passwordResetTokenRepository.create({
        id: new UniqueEntityId(),
        token: resetToken,
        userId: new UniqueEntityId(user.id.toString()),
        userType: patient ? "PATIENT" : "CLINICIAN",
        expiresAt,
        used: false,
      });

      await this.emailSender.sendForgotPasswordEmail(email, resetToken);
    }

    return right({ success: true });
  }
}
