import { Body, Controller, NotFoundException, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  // ApiConflictResponse,
  ApiCreatedResponse,
  ApiExcludeController,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { swaggerBody, validationBody, BodyType } from './create-consultation-schema';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { NestCreateConsultationUseCase } from '@/infrastructure/adapter/consultation/nest-create-consultation-use-case';
import { CreateConsultationPresenter } from '@/presentation/utils/presenters/create-consultation-presenter';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

@ApiExcludeController()
@Controller('consultations/clinician/:clinicianId/patient/:patientId/')
export class CreateConsultationController {
  constructor(private createConsultation: NestCreateConsultationUseCase) {}

  @Post()
  @ApiTags('Consultations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a consultation' })
  @ApiBody({ schema: swaggerBody })
  @ApiCreatedResponse({ description: 'Consultation created' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Invalid information' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
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
