import {
  Controller,
  NotFoundException,
  Param,
  Patch,
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

import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import {
  detailedDescription,
  ParamBodyType,
  ParamValidationBody,
} from './authorize-access-schema';
import { NestAuthorizeAccessUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-authorize-access';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';

@Controller('manage-access/authorize-access/:userId')
export class AuthorizeAccessController {
  constructor(private authorizeAccessUseCase: NestAuthorizeAccessUseCase) {}

  @Patch()
  @ApiTags('Manage record access')
  @ApiOperation({
    summary: 'Authorize access for record',
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
    description: 'Successfully authorized',
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Param('userId') userId: string,
    @CurrentUser() user: UserPayload,
    @Query('recordType', ParamValidationBody) recordType: typeof ParamBodyType,
  ) {
    const result = await this.authorizeAccessUseCase.execute({
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
