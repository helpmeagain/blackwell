import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { JwtAuthGuard } from '@/infrastructure/auth/jwt-auth.guard';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

const createConsultationSchema = z.object({
  clinicianId: z.string().uuid(),
  patientId: z.string().uuid(),
  room: z.number().int(),
  appointmentDate: z.string().datetime(),
});

type CreateConsultationSchema = z.infer<typeof createConsultationSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(createConsultationSchema);

@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class CreateConsultationController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @ApiBearerAuth()
  @ApiTags('Consultations')
  @ApiBody({ schema: requestBodyForOpenAPI })
  @UsePipes(new ZodValidationPipe(createConsultationSchema))
  async handle(@Body() body: CreateConsultationSchema) {
    const { clinicianId, patientId, room, appointmentDate } = body;

    const patientDoesNotExist = !(await this.prisma.patient.findUnique({
      where: { id: patientId },
    }));

    if (patientDoesNotExist) {
      throw new NotFoundException('Patient not found');
    }

    const clinicianDoesNotExist = !(await this.prisma.clinician.findUnique({
      where: { id: clinicianId },
    }));

    if (clinicianDoesNotExist) {
      throw new NotFoundException('Clinician not found');
    }

    const result = await this.prisma.consultation.create({
      data: {
        room,
        appointmentDate,
        clinicianId,
        patientId,
      },
    });

    return { consultation: result };
  }
}
