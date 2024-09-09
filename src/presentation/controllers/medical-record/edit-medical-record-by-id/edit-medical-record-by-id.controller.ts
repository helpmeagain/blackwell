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
import {
  BodyType,
  swaggerBody,
  validationBody,
} from './edit-medical-record-by-id-schema';
import { NestEditMedicalRecordByIdUseCase } from '@/infrastructure/adapter/medical-record/nest-edit-medical-record-by-id-use-case';

@Controller('medical-records/:id')
export class EditMedicalRecordByIdController {
  constructor(private editMedicalRecordById: NestEditMedicalRecordByIdUseCase) {}

  @Put()
  @ApiTags('Medical Record')
  @ApiOperation({ summary: 'Edit a medical record by id' })
  @ApiBearerAuth()
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({ description: 'Return medical record by id' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Body(validationBody) body: typeof BodyType, @Param('id') id: string) {
    const { diagnosis, comorbidity } = body;
    const result = await this.editMedicalRecordById.execute({
      medicalRecordId: id,
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
