import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { detailedDescription } from './remove-pending-authorization-schema';
import { NestRemovePendingAuthorizationUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-remove-pending-authorization';

@Controller(
  'neurofunctional-record/remove-pending-authorization/record-id/:id/user-id/:userId',
)
export class RemovePendingAuthorizationController {
  constructor(
    private removePendingAuthorizationUseCase: NestRemovePendingAuthorizationUseCase,
  ) {}

  @Delete()
  @ApiTags('Neurofunctional Record')
  @ApiOperation({
    summary: 'Remove pending authorization users',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Suceessfully removed',
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.removePendingAuthorizationUseCase.execute({
      recordId: id,
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
