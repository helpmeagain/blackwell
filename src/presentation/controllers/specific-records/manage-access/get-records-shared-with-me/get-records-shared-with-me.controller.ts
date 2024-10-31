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
import { detailedDescription } from './get-records-shared-with-me-schema';
import { NestGetRecordsSharedWithMeUseCase } from '@/infrastructure/adapter/specific-records/manage-access/nest-get-records-shared-with-me';
import { Roles } from '@/infrastructure/auth/role/roles.decorator';

@Controller('manage-access/get-records-shared-with-me')
export class GetRecordsSharedWithMeController {
  constructor(private getById: NestGetRecordsSharedWithMeUseCase) {}

  @Get()
  @ApiTags('Manage record access')
  @ApiOperation({
    summary: 'Get records shared with me',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return get records shared with me by user payload' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.getById.execute({
      currentUserId: user.sub,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const { recordsSharedWithMe } = result.value;

    return recordsSharedWithMe;
  }
}
