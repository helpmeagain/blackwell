import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { JwtService } from '@nestjs/jwt';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;
const requestBodyForOpenAPI = zodToOpenAPI(authenticateBodySchema);

@Controller('auth')
export class AuthenticateClinicianController {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  @Post('clinician')
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Authenticate a clinician' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const clinician = await this.prisma.clinician.findUnique({ where: { email } });
    if (!clinician) {
      throw new UnauthorizedException('User credentials do not match any user.');
    }

    const isPasswordValid = await compare(password, clinician.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match any user.');
    }

    const token = this.jwt.sign({ sub: clinician.id });
    return {
      access_token: token,
    };
  }
}
