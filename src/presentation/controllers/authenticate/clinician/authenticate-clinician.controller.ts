import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  BodyType,
  detailedDescription,
  exampleResponse,
  swaggerBody,
  validationBody,
} from './authenticate-clinician-schema';
import { NestAuthenticateClinicianUseCase } from '@/infrastructure/adapter/authenticate/nest-authenticate-clinician-use-case';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { WrongCredentials } from '@/application/common/error-handler/errors/wrong-credentials';
import { Public } from '@/infrastructure/auth/public';

@Controller('auth')
export class AuthenticateClinicianController {
  constructor(private authenticateClinicianUseCase: NestAuthenticateClinicianUseCase) {}

  @Post('clinician')
  @Public()
  @ApiTags('Authentication')
  @HttpCode(200)
  @ApiOperation({ summary: 'Authenticate a clinician', description: detailedDescription })
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({ description: 'Authenticated clinician', schema: exampleResponse })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  async handle(@Body(validationBody) body: typeof BodyType) {
    const { email, password } = body;

    const result = await this.authenticateClinicianUseCase.execute({ email, password });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case WrongCredentials:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { accessToken, role, userId } = result.value;

    return {
      access_token: accessToken,
      user_id: userId,
      role,
    };
  }
}
