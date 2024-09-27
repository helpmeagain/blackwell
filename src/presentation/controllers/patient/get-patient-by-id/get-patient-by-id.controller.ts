import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestGetPatientByIdUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-id';
import { ReturnPatientPresenter } from '@/presentation/utils/presenters/return-patient-presenter';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { detailedDescription, exampleResponse } from './get-patient-by-id-schema';

@Controller('patients/by-id/:id')
export class GetByIdPatientController {
  constructor(private getByIdPatient: NestGetPatientByIdUseCase) {}

  @Get()
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Get a patient by id', description: detailedDescription })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return patient by id', example: exampleResponse })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  @ApiNotFoundResponse({ description: 'Patient not found' })
  async handle(@Param('id') id: string) {
    const result = await this.getByIdPatient.execute({
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

    const { patient } = result.value;

    return { patient: ReturnPatientPresenter.toHTTP(patient) };
  }
}
