import { Body, Controller, NotFoundException, Param, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  swaggerBody,
  BodyType,
  validationBody,
  exampleResponse,
  detailedDescription,
} from './edit-record-schema';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ReturnNeurofunctionalePresenter } from '@/presentation/utils/presenters/return-neurofunctional-record-presenter';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestEditNeurofunctionalByIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-edit-neurofunctional-record';

@Controller('neurofunctional-record/:id')
export class EditNeurofunctionalRecordController {
  constructor(private editNeurofunctionalRecord: NestEditNeurofunctionalByIdUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Neurofunctional Record')
  @ApiOperation({
    summary: 'Edit a neurofunctional record',
    description: detailedDescription,
  })
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({
    description: 'Neurofunctional record edited successfully',
    example: exampleResponse,
  })
  @ApiNotFoundResponse({ description: 'Neurofunctional record not found' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  async handle(@Body(validationBody) body: typeof BodyType, @Param('id') id: string) {
    const result = await this.editNeurofunctionalRecord.execute({
      id,
      ...body,
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

    const { neurofunctionalRecord } = result.value;

    return {
      message: 'Neurofunctional record edited successfully',
      record: ReturnNeurofunctionalePresenter.toHTTP(neurofunctionalRecord),
    };
  }
}
