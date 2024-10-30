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
import { detailedDescription } from './get-authorizes-users-schema';
import { NestGetAuthorizedUsersUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-get-authorized-users';
import { Roles } from '@/infrastructure/auth/role/roles.decorator';

@Controller('manage-access/authorized-users')
export class GetAuthorizedUsersController {
  constructor(private getById: NestGetAuthorizedUsersUseCase) {}

  @Get()
  @ApiTags('Manage record access')
  @Roles('CLIENT')
  @ApiOperation({
    summary: 'Get authorized users',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return authorized authorization users by user payload' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.getById.execute({
      currentUserId: user.sub,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { authorizedUsers } = result.value;

    return {
      authorizedUsersUsers: authorizedUsers,
    };
  }
}
