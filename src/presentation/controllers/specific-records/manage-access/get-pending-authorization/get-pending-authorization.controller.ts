import { BadRequestException, Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { detailedDescription } from './get-pending-authorization-schema';
import { NestGetPendingAuthorizationUsersUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-get-pending-authorization';
import { Roles } from '@/infrastructure/auth/role/roles.decorator';

@Controller('manage-access/pending-authorization-users/')
export class GetPendingAuthorizationUsersController {
  constructor(private getById: NestGetPendingAuthorizationUsersUseCase) {}

  @Get()
  @ApiTags('Manage record access')
  @Roles('CLIENT')
  @ApiOperation({
    summary: 'Get pending authorization users',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return pending authorization users by user payload' })
  @ApiNotFoundResponse({ description: 'Neurofunctional Record not found' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.getById.execute({
      currentUserId: user.sub,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { pendingAuthorizationUsers } = result.value;

    return {
      pendingAuthorizationUsers: pendingAuthorizationUsers,
    };
  }
}
