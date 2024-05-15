import { Controller, Delete, HttpCode, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestDeletePatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-delete-patient';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

@Controller('patients/:id')
export class DeletePatientController {
  constructor(private deleteByIdPatient: NestDeletePatientByIdUseCase) {}

  @Delete()
  @HttpCode(204)
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Delete a patient by id' })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Delete patient successfully' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string) {
    const result = await this.deleteByIdPatient.execute({
      patientId: id,
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
  }
}
