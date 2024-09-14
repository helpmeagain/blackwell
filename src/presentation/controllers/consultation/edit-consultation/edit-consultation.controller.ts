import { Body, Controller, NotFoundException, Param, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestEditConsultationByIdUseCase } from '@/infrastructure/adapter/consultation/nest-edit-consultation-by-id-use-case';
import { BodyType, swaggerBody, validationBody } from './edit-consultation-schema';
import { CreateConsultationPresenter } from '@/presentation/utils/presenters/create-consultation-presenter';

@Controller('consultations/:id')
export class EditConsultationController {
  constructor(private editByIdConsultations: NestEditConsultationByIdUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Consultations')
  @ApiBody({ schema: swaggerBody })
  @ApiOperation({ summary: 'Edit a consultations by id' })
  @ApiOkResponse({ description: 'Edit consultations successfully' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Body(validationBody) body: typeof BodyType, @Param('id') id: string) {
    const { room, appointmentDate } = body;

    const result = await this.editByIdConsultations.execute({
      consultationId: id,
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
      message: 'Consultation edited successfully',
      consultation: CreateConsultationPresenter.toHTTP(consultation),
    };
  }
}
