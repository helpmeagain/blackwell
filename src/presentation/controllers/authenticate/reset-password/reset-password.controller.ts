import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import {
  BodyType,
  detailedDescription,
  exampleResponse,
  swaggerBody,
  validationBody,
} from "./reset-password-schema";
import { Public } from "@/infrastructure/auth/public";
import { NestResetPasswordUseCase } from "@/infrastructure/adapter/authenticate/nest-reset-password-use-case";
import { BadRequest } from "@/application/common/error-handler/errors/bad-request";
import { ResourceNotFound } from "@/application/common/error-handler/errors/resource-not-found";
import { InvalidToken } from "@/application/common/error-handler/errors/invalid-token";

@Controller("auth")
export class ResetPasswordController {
  constructor(private forgotPasswordUseCase: NestResetPasswordUseCase) {}

  @Patch("reset-password/:token")
  @Public()
  @ApiTags("Authentication reset")
  @HttpCode(200)
  @ApiOperation({
    summary: "Reset password using token",
    description: detailedDescription,
  })
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({
    description: "Password reset was successful",
    schema: exampleResponse,
  })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param("token") token: string
  ) {
    const { password } = body;

    const result = await this.forgotPasswordUseCase.execute({
      token,
      newPassword: password,
    });

    if (result.isLeft()) {
      const error = result.value;

      if (error instanceof ResourceNotFound) {
        throw new NotFoundException(error.message);
      } else if (error instanceof InvalidToken) {
        throw new UnauthorizedException(error.message);
      } else {
        throw new BadRequest("Invalid request");
      }
    }

    return {
      message: "Successfully reset password",
    };
  }
}
