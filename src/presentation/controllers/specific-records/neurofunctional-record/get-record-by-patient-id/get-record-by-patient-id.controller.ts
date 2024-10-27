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
import { ReturnNeurofunctionalePresenter } from '@/presentation/utils/presenters/return-neurofunctional-record-presenter';
import { NestGetNeurofunctionalByPatientIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-patient-id';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { detailedDescription } from './get-record-by-patient-id-schema';

@Controller('neurofunctional-record/by-patient-id/:patientId')
export class GetByPatientIdNeurofunctionalController {
  constructor(private getById: NestGetNeurofunctionalByPatientIdUseCase) {}

  @Get()
  @ApiTags('Specific records - Neurofunctional Record')
  @ApiOperation({
    summary: 'Get a neurofunctional record by patient id',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return neurofunctional record by patient id' })
  @ApiNotFoundResponse({ description: 'Neurofunctional Record not found' })
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

    const { neurofunctionalRecord } = result.value;

    return {
      record: ReturnNeurofunctionalePresenter.toHTTP(neurofunctionalRecord),
    };
  }
}
