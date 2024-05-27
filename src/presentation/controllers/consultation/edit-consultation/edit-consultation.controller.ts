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
import { z } from 'zod';
import { ZodValidationPipe } from '@/presentation/pipes/zod-validation-pipe';
import { zodToOpenAPI } from 'nestjs-zod';
import { CreateConsultationPresenter } from '@/presentation/presenters/create-consultation-presenter';

const editClinicianSchema = z.object({
  room: z.number().int(),
  appointmentDate: z.string().datetime(),
});

const bodyValidationPipe = new ZodValidationPipe(editClinicianSchema);
type EditClinicianSchema = z.infer<typeof editClinicianSchema>;
const requestBodyForOpenAPI = zodToOpenAPI(editClinicianSchema);

@Controller('consultations/:id')
export class EditConsultationController {
  constructor(private editByIdConsultations: NestEditConsultationByIdUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Consultations')
  @ApiBody({ schema: requestBodyForOpenAPI })
  @ApiOperation({ summary: 'Edit a consultations by id' })
  @ApiOkResponse({ description: 'Edit consultations successfully' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Body(bodyValidationPipe) body: EditClinicianSchema,
    @Param('id') id: string,
  ) {
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
