import {
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { UserAlreadyMadeRequest } from '@/application/common/error-handler/errors/user-already-made-request';
import { NestRequestAccessUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-request-access';
import {
  detailedDescription,
  ParamBodyType,
  ParamValidationBody,
} from './request-access-schema';
import { NestRequestAccessUseCaseByPatientId } from '@/infrastructure/adapter/specific-records/manage-access/nest-request-access-by-patient-id';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';

@Controller('manage-access/request-access-by-patient-id/:patientId/')
export class RequestAccessByPatientIdController {
  constructor(private getRequestAccessUseCase: NestRequestAccessUseCaseByPatientId) {}

  @Patch()
  @ApiTags('Manage record access')
  @ApiOperation({
    summary: 'Request authorization',
    description: detailedDescription,
  })
  @ApiQuery({
    name: 'recordType',
    required: true,
    type: String,
    enum: ['Neurofunctional', 'Trauma', 'Cardio'],
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Suceessfully asked for authorization',
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Param('patientId') patientId: string,
    @Query('recordType', ParamValidationBody) recordType: typeof ParamBodyType,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.getRequestAccessUseCase.execute({
      recordType,
      patientId,
      userId: user.sub,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        case UserAlreadyMadeRequest:
          throw new ConflictException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }
  }
}
