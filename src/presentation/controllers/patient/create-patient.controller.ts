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

const createPatientSchema = z.object({
  name: z.string(),
  surname: z.string(),
  slug: z.string(),
  gender: z.enum(['male', 'female', 'non-binary', 'other']),
  birthDate: z.string().datetime(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreatePatientSchema = z.infer<typeof createPatientSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(createPatientSchema);

@Controller('patients')
export class CreatePatientController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Create a patient' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiCreatedResponse({ description: 'Patient created' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  @UsePipes(new ZodValidationPipe(createPatientSchema))
  async handle(@Body() body: CreatePatientSchema) {
    const { name, surname, slug, gender, birthDate, phoneNumber, email, password } = body;

    const [patientWithSameEmail, patientWithSameSlug] = await Promise.all([
      this.prisma.patient.findUnique({ where: { email } }),
      this.prisma.patient.findUnique({ where: { slug } }),
    ]);

    if (patientWithSameEmail) {
      throw new ConflictException('Patient with same email already exists');
    }

    if (patientWithSameSlug) {
      throw new ConflictException('Patient with same slug already exists');
    }

    const hashedPassword = await hash(password, 8);

    const result = await this.prisma.patient.create({
      data: {
        name,
        surname,
        slug,
        gender,
        birthDate,
        phoneNumber,
        email,
        password: hashedPassword,
      },
    });

    return { result };
  }
}
