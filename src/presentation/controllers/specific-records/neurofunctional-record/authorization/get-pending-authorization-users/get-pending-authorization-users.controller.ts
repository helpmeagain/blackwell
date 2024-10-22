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
import { NestGetPendingAuthorizationUsersUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-get-pending-authorization';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { detailedDescription } from './get-pending-authorization-users-schema';

@Controller('neurofunctional-record/pending-authorization-users/:id')
export class GetPendingAuthorizationUsersController {
  constructor(private getById: NestGetPendingAuthorizationUsersUseCase) {}

  @Get()
  @ApiTags('Neurofunctional Record')
  @ApiOperation({
    summary: 'Get pending authorization users id',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return pending authorization users by record id' })
  @ApiNotFoundResponse({ description: 'Neurofunctional Record not found' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    const result = await this.getById.execute({
      id,
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

    const { pendingAuthorizationUsers } = result.value;

    return {
      pendingAuthorizationUsers: pendingAuthorizationUsers,
    };
  }
}
