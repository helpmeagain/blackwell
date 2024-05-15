import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, ConflictException, Controller, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { UserAlreadyExists } from '@/application/common/error-handler/errors/user-already-exists';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { Public } from '@/infrastructure/auth/public';
import { NestCreateConsultationUseCase } from '@/infrastructure/adapter/consultation/nest-create-consultation-use-case';
import { CreateConsultationPresenter } from '@/presentation/presenters/create-consultation-presenter';

const createClinicianSchema = z.object({
  room: z.number().int(),
  appointmentDate: z.string().datetime(),
});

const bodyValidationPipe = new ZodValidationPipe(createClinicianSchema);
type CreateClinicianSchema = z.infer<typeof createClinicianSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(createClinicianSchema);

@Controller('consultations/:patientId/:clinicianId/:medicalRecordId')
export class CreateConsultationController {
  constructor(private createConsultation: NestCreateConsultationUseCase) {}

  @Post()
  @Public()
  @ApiTags('Consultations')
  @ApiOperation({ summary: 'Create a consultation' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiCreatedResponse({ description: 'Consultation created' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  @ApiConflictResponse({ description: 'Conflict' })
  async handle(
    @Body(bodyValidationPipe) body: CreateClinicianSchema,
    @Param('patientId') patientId: string,
    @Param('clinicianId') clinicianId: string,
    @Param('medicalRecordId') medicalRecordId: string,
  ) {
    const { room, appointmentDate } = body;

    const result = await this.createConsultation.execute({
      patientId,
      clinicianId,
      medicalRecordId,
      room,
      appointmentDate: new Date(appointmentDate),
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case UserAlreadyExists:
          throw new ConflictException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { consultation } = result.value;

    return {
      message: 'Consultation created successfully',
      consultation: CreateConsultationPresenter.toHTTP(consultation),
    };
  }
}
