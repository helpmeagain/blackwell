import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  // ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { z } from 'zod';
import { zodToOpenAPI } from 'nestjs-zod';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { NestCreateConsultationUseCase } from '@/infrastructure/adapter/consultation/nest-create-consultation-use-case';
import { CreateConsultationPresenter } from '@/presentation/presenters/create-consultation-presenter';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

const createClinicianSchema = z.object({
  room: z.number().int(),
  appointmentDate: z.string().datetime(),
});

const bodyValidationPipe = new ZodValidationPipe(createClinicianSchema);
type CreateClinicianSchema = z.infer<typeof createClinicianSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(createClinicianSchema);

@Controller('consultations/clinician/:clinicianId/patient/:patientId/')
export class CreateConsultationController {
  constructor(private createConsultation: NestCreateConsultationUseCase) {}

  @Post()
  @ApiTags('Consultations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a consultation' })
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiCreatedResponse({ description: 'Consultation created' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  // @ApiConflictResponse({ description: 'Conflict' })
  async handle(
    @Body(bodyValidationPipe) body: CreateClinicianSchema,
    @Param('clinicianId') clinicianId: string,
    @Param('patientId') patientId: string,
  ) {
    const { room, appointmentDate } = body;

    const result = await this.createConsultation.execute({
      patientId,
      clinicianId,
      room,
      appointmentDate: new Date(appointmentDate),
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
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
