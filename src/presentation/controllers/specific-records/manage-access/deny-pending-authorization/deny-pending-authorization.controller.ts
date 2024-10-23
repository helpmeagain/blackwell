import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  Query,
  UnauthorizedException,
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
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { NestDenyPendingAuthorizationUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-deny-pending-authorization';
import {
  detailedDescription,
  ParamBodyType,
  ParamValidationBody,
} from './deny-pending-authorization-schema';

@Controller('manage-access/pending-authorization/deny-access/:userId')
export class DenyPendingAuthorizationController {
  constructor(
    private denyPendingAuthorizationUseCase: NestDenyPendingAuthorizationUseCase,
  ) {}

  @Delete()
  @ApiTags('Manage record access')
  @ApiOperation({
    summary: 'Deny pending authorization users',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'recordType',
    required: true,
    type: String,
    enum: ['Neurofunctional', 'Trauma', 'Cardio'],
  })
  @ApiOkResponse({
    description: 'Suceessfully denyd',
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Query('recordType', ParamValidationBody) recordType: typeof ParamBodyType,
    @Param('userId') userId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.denyPendingAuthorizationUseCase.execute({
      recordType,
      userId,
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
  }
}
