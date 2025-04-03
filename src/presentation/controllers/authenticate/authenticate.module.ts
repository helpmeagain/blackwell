import { Module } from "@nestjs/common";
import { AuthenticateClinicianController } from "./clinician/authenticate-clinician.controller";
import { AuthenticatePatientController } from "./patient/authenticate-patient.controller";
import { NestAuthenticateClinicianUseCase } from "@/infrastructure/adapter/authenticate/nest-authenticate-clinician-use-case";
import { NestAuthenticatePatientUseCase } from "@/infrastructure/adapter/authenticate/nest-authenticate-patient-use-case";
import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { CryptographyModule } from "@/infrastructure/cryptography/cryptography.module";
import { NestForgotPasswordUseCase } from "@/infrastructure/adapter/authenticate/nest-forgot-password-use-case";
import { ForgotPasswordController } from "./forgot-password/forgot-password.controller";
import { NestResetPasswordUseCase } from "@/infrastructure/adapter/authenticate/nest-reset-password-use-case";
import { ResetPasswordController } from "./reset-password/reset-password.controller";

@Module({
  imports: [PersistenceModule, CryptographyModule],
  controllers: [
    AuthenticateClinicianController,
    AuthenticatePatientController,
    ForgotPasswordController,
    ResetPasswordController,
  ],
  providers: [
    NestAuthenticateClinicianUseCase,
    NestAuthenticatePatientUseCase,
    NestForgotPasswordUseCase,
    NestResetPasswordUseCase,
  ],
})
export class AuthenticateModule {}
