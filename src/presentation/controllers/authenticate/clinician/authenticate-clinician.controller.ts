import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { NestAuthenticateClinicianUseCase } from '@/infrastructure/adapter/authenticate/nest-authenticate-clinician-use-case';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { WrongCredentials } from '@/application/common/error-handler/errors/wrong-credentials';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;
const requestBodyForOpenAPI = zodToOpenAPI(authenticateBodySchema);

@Controller('auth')
export class AuthenticateClinicianController {
  constructor(private authenticateClinicianUseCase: NestAuthenticateClinicianUseCase) {}

  @Post('clinician')
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Authenticate a clinician' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
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

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
