import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
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
} from './edit-record-by-id-schema';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ReturnCardiorespiratoryPresenter } from '@/presentation/utils/presenters/return-cardiorespiratory-presenter';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestEditCardiorespiratoryByIdUseCase } from '@/infrastructure/adapter/specific-records/cardiorespiratory-record/nest-edit-record';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

@Controller('cardiorespiratory-record/:id')
export class EditCardiorespiratoryRecordController {
  constructor(private editCardiorespiratoryRecord: NestEditCardiorespiratoryByIdUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Specific records - Cardiorespiratory Record')
  @ApiOperation({
    summary: 'Edit a cardiorespiratory record',
    description: detailedDescription,
  })
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({
    description: 'Cardiorespiratory record edited successfully',
    example: exampleResponse,
  })
  @ApiNotFoundResponse({ description: 'Cardiorespiratory record not found' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.editCardiorespiratoryRecord.execute({
      id,
      currentUserId: user.sub,
      ...body,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        case UnauthorizedUser:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { cardiorespiratoryRecord } = result.value;

    return {
      message: 'Cardiorespiratory record edited successfully',
      record: ReturnCardiorespiratoryPresenter.toHTTP(cardiorespiratoryRecord),
    };
  }
}
