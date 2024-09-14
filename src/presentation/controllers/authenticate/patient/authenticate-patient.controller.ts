import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BodyType, swaggerBody, validationBody } from './authenticate-patient-schema';
import { NestAuthenticatePatientUseCase } from '@/infrastructure/adapter/authenticate/nest-authenticate-patient-use-case';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { WrongCredentials } from '@/application/common/error-handler/errors/wrong-credentials';
import { Public } from '@/infrastructure/auth/public';

@Controller('auth')
export class AuthenticatePatientController {
  constructor(private authenticatePatientUseCase: NestAuthenticatePatientUseCase) {}

  @Post('patient')
  @Public()
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Authenticate a patient' })
  @ApiBody({ schema: swaggerBody })
  async handle(@Body(validationBody) body: typeof BodyType) {
    const { email, password } = body;

    const result = await this.authenticatePatientUseCase.execute({ email, password });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case WrongCredentials:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
