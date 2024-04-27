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

const createClinicianSchema = z.object({
  name: z.string(),
  surname: z.string(),
  slug: z.string(),
  gender: z.enum(['male', 'female', 'non-binary', 'other']),
  occupation: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateClinicianSchema = z.infer<typeof createClinicianSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(createClinicianSchema);

@Controller('clinicians')
export class CreateClinicianController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @ApiTags('Clinicians')
  @ApiOperation({ summary: 'Create a clinician' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiCreatedResponse({ description: 'Clinician created' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  @UsePipes(new ZodValidationPipe(createClinicianSchema))
  async handle(@Body() body: CreateClinicianSchema) {
    const { name, surname, slug, gender, occupation, phoneNumber, email, password } =
      body;

    const clinicianWithSameEmail = await this.prisma.clinician.findUnique({
      where: { email },
    });

    const clinicianWithSameSlug = await this.prisma.clinician.findUnique({
      where: { slug },
    });

    if (clinicianWithSameEmail) {
      throw new ConflictException('Clinician with same email already exists');
    }

    if (clinicianWithSameSlug) {
      throw new ConflictException('Clinician with same slug already exists');
    }

    const hashedPassword = await hash(password, 8);

    const result = await this.prisma.clinician.create({
      data: {
        name,
        surname,
        slug,
        gender,
        occupation,
        phoneNumber,
        email,
        password: hashedPassword,
      },
    });

    return { result };
  }
}
