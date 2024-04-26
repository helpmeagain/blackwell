import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';
import { Body, ConflictException, Controller, HttpCode, Post } from '@nestjs/common';
import { hash } from 'bcryptjs';

@Controller('clinicians')
export class CreateClinicianController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @HttpCode(409)
  async handle(@Body() body: any) {
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
