import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, ConflictException, Controller, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { JwtService } from '@nestjs/jwt';

// const createClinicianSchema = z.object({
//   name: z.string(),
//   surname: z.string(),
//   slug: z.string(),
//   gender: z.enum(['male', 'female', 'non-binary', 'other']),
//   occupation: z.string(),
//   phoneNumber: z.string(),
//   email: z.string().email(),
//   password: z.string(),
// });

// type CreateClinicianSchema = z.infer<typeof createClinicianSchema>;
// const requestBodyForOpenAPI = zodToOpenAPI(createClinicianSchema);

@Controller('clinicians')
export class AuthenticateClinicianController {
  constructor(private jwt: JwtService) {}

  @Post('login')
  @ApiTags('Clinicians')
  // @ApiOperation({ summary: 'Create a clinician' })
  // @ApiBody({ schema: requestBodyForOpenAPI })
  // @ApiCreatedResponse({ description: 'Clinician created' })
  // @ApiBadRequestResponse({ description: 'Invalid information' })
  // @ApiConflictResponse({ description: 'Conflict' })
  // @UsePipes(new ZodValidationPipe(createClinicianSchema))
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' });
    return token;
  }
}
