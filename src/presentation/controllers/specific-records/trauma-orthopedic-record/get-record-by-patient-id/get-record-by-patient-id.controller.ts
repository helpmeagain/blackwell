import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
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
import { ReturnTraumaOrthopedicPresenter } from '@/presentation/utils/presenters/return-trauma-orthopedic-presenter';
import { NestGetTraumaOrthopedicByPatientIdUseCase } from '@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-get-record-by-patient-id';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { detailedDescription } from './get-record-by-patient-id-schema';

@Controller('trauma-orthopedic-record/by-patient-id/:patientId')
export class GetByPatientIdTraumaOrthopedicController {
  constructor(private getById: NestGetTraumaOrthopedicByPatientIdUseCase) {}

  @Get()
  @ApiTags('Specific records - Trauma Orthopedic Record')
  @ApiOperation({
    summary: 'Get a trauma orthopedic record by patient id',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return trauma orthopedic record by patient id' })
  @ApiNotFoundResponse({ description: 'Trauma Orthopedic Record not found' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('patientId') patientId: string, @CurrentUser() user: UserPayload) {
    const result = await this.getById.execute({
      patientId,
      currentUserId: user.sub,
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
      record: ReturnTraumaOrthopedicPresenter.toHTTP(traumaorthopedicRecord),
    };
  }
}
