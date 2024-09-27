import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NestGetClinicianByIdUseCase } from '@/infrastructure/adapter/clinician/nest-get-clinician-by-id';
import { ReturnClinicianPresenter } from '@/presentation/utils/presenters/return-clinician-presenter';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { detailedDescription, exampleResponse } from './get-clinician-by-id-schema';

@Controller('clinicians/by-id/:id')
export class GetByIdClinicianController {
  constructor(private getByIdClinician: NestGetClinicianByIdUseCase) {}

  @Get()
  @ApiTags('Clinicians')
  @ApiOperation({ summary: 'Get a clinician by id', description: detailedDescription })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return clinician by id', example: exampleResponse })
  @ApiNotFoundResponse({ description: 'Clinician not found' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string) {
    const result = await this.getByIdClinician.execute({
      clinicianId: id,
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

    const { clinician } = result.value;

    return { clinician: ReturnClinicianPresenter.toHTTP(clinician) };
  }
}
