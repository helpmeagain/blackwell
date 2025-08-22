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
  ApiExcludeController,
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

@ApiExcludeController()
@Controller('manage-access/request-access/record-id/:recordId/userId/:userId')
export class RequestAccessController {
  constructor(private getRequestAccessUseCase: NestRequestAccessUseCase) {}

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
    @Param('recordId') recordId: string,
    @Param('userId') userId: string,
    @Query('recordType', ParamValidationBody) recordType: typeof ParamBodyType,
  ) {
    const result = await this.getRequestAccessUseCase.execute({
      recordType,
      recordId,
      userId,
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
