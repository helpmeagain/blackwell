import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { ReturnUniversalMedicalRecordPresenter } from '@/presentation/utils/presenters/return-universal-medical-record-presenter';
import { NestGetUniversalMedicalRecordByPatientIdUseCase } from '@/infrastructure/adapter/universal-medical-record/nest-get-universal-medical-record-by-patient-id-use-case';
import {
  detailedDescription,
  exampleResponse,
} from './get-universal-medical-record-by-patient-id-schema';

@Controller('universal-medical-record/by-patient-id/:patientId')
export class GetUniversalMedicalRecordByPatientIdController {
  constructor(
    private getUniversalMedicalRecordById: NestGetUniversalMedicalRecordByPatientIdUseCase,
  ) {}

  @Get()
  @ApiTags('Universal Medical Record')
  @ApiOperation({
    summary: 'Get a universal medical record by patient id',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Return universal medical record by patient id',
    example: exampleResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  @ApiNotFoundResponse({ description: 'Universal medical record not found' })
  async handle(@Param('patientId') patientId: string) {
    const result = await this.getUniversalMedicalRecordById.execute({
      patientId,
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

    const { universalMedicalRecord: universalmedicalRecord } = result.value;

    return {
      universalMedicalRecord:
        ReturnUniversalMedicalRecordPresenter.toHTTP(universalmedicalRecord),
    };
  }
}
