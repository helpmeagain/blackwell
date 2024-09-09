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
import { ReturnMedicalRecordPresenter } from '@/presentation/utils/presenters/return-medical-record-presenter';
import { NestEditMedicalRecordByPatientIdUseCase } from '@/infrastructure/adapter/medical-record/nest-edit-medical-record-by-patient-id-use-case';
import {
  BodyType,
  swaggerBody,
  validationBody,
} from './edit-medical-record-by-patient-id-schema';

@Controller('medical-records/by-patient-id/:patientId')
export class EditMedicalRecordByPatientIdController {
  constructor(private editMedicalRecordById: NestEditMedicalRecordByPatientIdUseCase) {}

  @Put()
  @ApiTags('Medical Record')
  @ApiOperation({ summary: 'Edit a medical record by patient id' })
  @ApiBearerAuth()
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({ description: 'Return medical record by id' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param('patientId') patientId: string,
  ) {
    const { diagnosis, comorbidity } = body;
    const result = await this.editMedicalRecordById.execute({
      patientId,
      diagnosis,
      comorbidity,
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

    const { medicalRecord } = result.value;

    return { medicalRecord: ReturnMedicalRecordPresenter.toHTTP(medicalRecord) };
  }
}
