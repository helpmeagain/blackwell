import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { NestAuthenticateClinicianUseCase } from '@/infrastructure/adapter/authenticate/nest-authenticate-clinician-use-case';

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
      throw new Error();
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
