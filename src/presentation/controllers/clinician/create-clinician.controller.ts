import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const createClinicianSchema = z.object({
  name: z.string(),
  surname: z.string(),
  slug: z.string(),
  gender: z.string(),
  occupation: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateClinicianSchema = z.infer<typeof createClinicianSchema>;

@Controller('clinicians')
export class CreateClinicianController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createClinicianSchema))
  @HttpCode(201)
  @HttpCode(409)
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

    await this.prisma.clinician.create({
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
  }
}
