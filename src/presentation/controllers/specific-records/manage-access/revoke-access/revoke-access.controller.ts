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
import {
  detailedDescription,
  ParamBodyType,
  ParamValidationBody,
} from './revoke-access-schema';
import { NestRevokeAccessUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-revoke-access';

@Controller('manage-access/revoke-access/:userId')
export class RevokeAccessController {
  constructor(private revokeAccessUseCase: NestRevokeAccessUseCase) {}

  @Delete()
  @ApiTags('Manage record access')
  @ApiQuery({
    name: 'recordType',
    required: true,
    type: String,
    enum: ['Neurofunctional', 'Trauma', 'Cardio'],
  })
  @ApiOperation({
    summary: 'Remove access from user',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Successfully removed',
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Query('recordType', ParamValidationBody) recordType: typeof ParamBodyType,
    @Param('userId') userId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.revokeAccessUseCase.execute({
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
