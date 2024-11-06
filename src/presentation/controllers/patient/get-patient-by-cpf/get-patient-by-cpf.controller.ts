import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestGetPatientByCpfUseCase } from '@/infrastructure/adapter/patient/nest-get-patient-by-cpf';
import { ReturnPatientPresenter } from '@/presentation/utils/presenters/return-patient-presenter';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';

@Controller('patients/by-cpf/:cpf')
export class GetByCpfPatientController {
  constructor(private getByCpfPatient: NestGetPatientByCpfUseCase) {}

  @Get()
  @ApiTags('Patients')
  @ApiOperation({ summary: 'Get a patient by cpf' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return patient by cpf'})
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  @ApiNotFoundResponse({ description: 'Patient not found' })
  async handle(@Param('cpf') cpf: string) {
    const result = await this.getByCpfPatient.execute({
      cpf,
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
