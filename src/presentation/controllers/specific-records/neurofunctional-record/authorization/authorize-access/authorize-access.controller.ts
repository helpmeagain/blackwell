import {
  Controller,
  NotFoundException,
  Param,
  Patch,
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
import { NestAuthorizeAccessUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-authorize-access';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

@Controller('neurofunctional-record/authorize-access/record-id/:id/user-id/:userId')
export class AuthorizeAccessController {
  constructor(private authorizeAccessUseCase: NestAuthorizeAccessUseCase) {}

  @Patch()
  @ApiTags('Neurofunctional Record')
  @ApiOperation({
    summary: 'Authorize access for record',
    description: 'Insert an record Id and User Id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Suceessfully authorized',
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.authorizeAccessUseCase.execute({
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
