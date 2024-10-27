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
import { ReturnTraumaOrthopedicPresenter } from '@/presentation/utils/presenters/return-trauma-orthopedic-presenter';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestEditTraumaOrthopedicByIdUseCase } from '@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-edit-record';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

@Controller('trauma-orthopedic-record/:id')
export class EditTraumaOrthopedicRecordController {
  constructor(private editTraumaOrthopedicRecord: NestEditTraumaOrthopedicByIdUseCase) {}

  @Put()
  @ApiBearerAuth()
  @ApiTags('Specific records - Trauma Orthopedic Record')
  @ApiOperation({
    summary: 'Edit a trauma orthopedic record',
    description: detailedDescription,
  })
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({
    description: 'Trauma Orthopedic record edited successfully',
    example: exampleResponse,
  })
  @ApiNotFoundResponse({ description: 'Trauma Orthopedic record not found' })
  @ApiBadRequestResponse({ description: 'Invalid request' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.editTraumaOrthopedicRecord.execute({
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

    const { traumaorthopedicRecord } = result.value;

    return {
      message: 'Trauma Orthopedic record edited successfully',
      record: ReturnTraumaOrthopedicPresenter.toHTTP(traumaorthopedicRecord),
    };
  }
}
