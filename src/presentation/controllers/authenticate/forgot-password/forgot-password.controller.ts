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
} from './forgot-password-schema';
import { NestForgotPasswordUseCase } from '@/infrastructure/adapter/authenticate/nest-forgot-password-use-case';
import { Public } from '@/infrastructure/auth/public';

@Controller('auth')
export class ForgotPasswordController {
  constructor(private forgotPasswordUseCase: NestForgotPasswordUseCase) {}

  @Post('forgot-password')
  @Public()
  @ApiTags('Authentication reset')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send token to email', description: detailedDescription })
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({ description: 'Token sended', schema: exampleResponse })
  async handle(@Body(validationBody) body: typeof BodyType) {
    const { email } = body;

    await this.forgotPasswordUseCase.execute({ email });

    return {
      message: 'Successfully sent email',
      timestamp: new Date().toISOString()
    };
  }
}
